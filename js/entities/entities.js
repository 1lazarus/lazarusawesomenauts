game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
     this.setSuper(x, y); 
     this.setPlayerTimers();
     this.setAttributes();
     this.type = "PlayerEntity";
     this.setFlags();
     this.addAnimation();
       
        this.lastAttack = new Date().getTime();
        //Enemy wiil follow u//
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
       
    },
    setSuper:function(x, y){
           this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    setPlayerTimers:function(){
      this.now = new Date().getTime();
      this.lastHit = this.now;
    },
    setAttributes:function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags:function(){
       //keeps track of direction your characters going
       this.facing = "right";
       //time my attacks
        this.dead = false;  
        this.renderable.setCurrentAnimation("idle");
        this.attacking = false;
    },
    addAnimation:function(){
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 124, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

       
    },
    update: function(delta) {
        this.now = new Date().getTime(); 
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.setAnimation(); 
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead:function(){
            //if my health goes below zero i will die
        if (this.health <= 0) {
            return true;

        }
        return false; 
    },
    cheKeyPressesAndMove:function(){
            
        if (me.input.isKeyPressed("right")) {
                 this.moveRight();
            this.renderable.flipX(true);
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x = 0;
        }
        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
           this.jump();
        }
      this.attacking = me.input.isKeyPressed("attack");
    },
    moveRight:function(){
            //adds to the position of  my x by the velocity define above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
    },
    moveLeft:function(){
        this.renderable.flipX(false);
            this.facing = "left";
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
    },
    jump:function(){
       this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;  
    },
    setAnimation:function(){
             if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                console.log(!this.renderable.isCurrentAnimation("attack"));
                //sets the current animation to attack and once that is over 
                //goes back 2 idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next time wwe start this sequence we begin
                //from the first animation, not whenever we left off when  we
                //switched to anonther animation 
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    loseHealth: function(damage) {
        console.log(this.health);
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
          this.collideWithEnemyCreep(response);
        }
    },
    collideWithEnemyBase: function(response){
              var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;

            if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
                this.body.vel.x = 0;
                // this.pos.x = this.pos.x -1;

            } else if (xdif < 70 && this.facing === 'left' && xdif > 0) {
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x +1;

            } else if (ydif < -40 && xdif < 70 && xdif > -35) {
                this.body.falling = false;
                this.body.vel.y = -1;
            }
            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
                response.b.loseHealth(game.data.playerAttack);
                this.lastHit = this.now;
                console.log("tower Hit");
            }
    },
    collideWithEnemyCreep:function(response){
          this.collideWithEnemyBase(response);

            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;

            this.stopMovement(xdif); 
         
             if(this.checkAttack(xdif,ydif)){
             this.hitCreep(response);
             };
    },
    stopMovement:function(xdif){
             if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                if (this.facing === "left") {
                    this.body.vel.x = 0;
                }
            } else {
                this.pos.x = this.pos.x - 1;
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            }
    },
    checkAttack:function(xdif,ydif){
        
            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <= 40) &&
                    (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing == "right"))
                    ) {
                this.lastHit = this.now;
                //if the creeps health is less than our attack excute code in if statement
                return true;
               }
               return false;
    },
    hitCreep:function(response){
      if (response.b.health <= game.data.playerAttack) {
                    //adds one gold for a creep kill
                    game.data.gold += 1;
                    console.log("Current gold:" + game.data.gold);
                }
                response.b.loseHealth(game.data.playerAttack);
                   
    }

});





