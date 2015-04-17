game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheiight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }

            }]);
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //this.attacking lets us know if the enemy is currently  attacking
        this.attacking = false;
        //keeps track of when our creep last attack anything
        this.lastAttacking = new Date().getTime();
        //keeps track of the last our creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        this.type = "EnemyCreep";
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    //Crrep can lose health if attacked
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }
        this.now = new Date().getTime();
        this.body.vel.x -= this.body.accel.x * me.timer.tick;


        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;

    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBase') {
            this.attacking = true;
            //this.lastAttacking=this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to right to maintain its position
            if ((this.now - this.lastHit >= 1000)) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //makes the player base call its losehealth function passes 
                //damage of 1
                response.b.loseHealth(1);
            }
        } else if (response.b.type === 'PlayerEntity') {
            console.log("jim")
            this.attacking = true;
            //this.lastAttacking=this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to right to maintain its position
            if ((this.now - this.lastHit >= 1000)) {
                console.log("alex")
                //updates the lasthit timer
                this.lastHit = this.now;
                //makes the player base call its losehealth function passes 
                //damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }

        }
    }
});




