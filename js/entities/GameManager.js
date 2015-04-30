game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.paused = false;
        this.lastCreep = new Date().getTime();

        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();



        return true;
    },
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.exp1+1);
            console.log("Current gold: " + game.data.gold);
        }
    },
    creepTimerCheck: function() {

        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);

        }
    }
});

game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;

   },
    update: function() {
        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }

});

game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        console.log(game.data.win + " " + this.gameover);
        
        if (game.data.win === true && !this.gameover) {
            console.log("win");
            this.gameOver(true);
        }else if(game.data.win===false && !this.gameover) {
            console.log("lose");
            this.gameOver(false);
        }


        return true;
    },
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        this.gameover = true;
        me.save.exp = game.data.exp;
        console.log(me.save.exp);

    }

});

game.SpendGold = Object.extend({
    init: function(x, y, settings){
         this.now = new Date().getTime();
        this.paused = false;
        this.lastBuy = new Date().getTime();
        this.updateWhenPaused = true;

        this.alwaysUpdate = true;
    },
                                 
    update: function(){
        if(me.input.isKeyPressed("boy") && this.now-this.lastBuy >=1000){
            this.lastBuy = this.now;
            if(!this.startBuying){
                this.startBuying();
            }else{
                this.stopBuying();
            }
        }
        
        return true;
    },
    
    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0,0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data .buyscreen.setOpacity(0,8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0,0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.F1, "F1", true);
        me.input.bindKey(me.input.F1, "F2", true);
        me.input.bindKey(me.input.F1, "F3", true);
        me.input.bindKey(me.input.F1, "F4", true);
        me.input.bindKey(me.input.F1, "F5", true);
        me.input.bindKey(me.input.F1, "F6", true);
        me.game.world.removeChild(game.data.buytext); 
    },
    
    setBuyText: function(){
        
        game.data.buytext = (new(me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x,game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT Current Gold", + game.data.gold, this.pos.x, this.pos.y);
                 this.font.draw(renderer.getContext(), "Skill 1:Increase Damage. Current Level:" + game.data.skill1 +"Cost"+ ((game.data.skill1+1)*10),this.pos.x, this.pos.y);
                  this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level:" + game.data.skill2 +"Cost"+ ((game.data.skill2+1)*10), this.pos.x, this.pos.y);
                   this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level:" + game.data.skill3 +"Cost"+ ((game.data.skill3+1)*10), this.pos.x, this.pos.y);
                    this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level:" + game.data.ability1 +"Cost"+ ((game.data.ability1+1)*10), this.pos.x, this.pos.y);
                     this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health:" + game.data.ability2 +"Cost"+ ((game.data.ability2+1)*10), this.pos.x, this.pos.y);
                      this.font.draw(renderer.getContext(), "E Ability: Throw your Spear:" + game.data.ability3 +"Cost"+ ((game.data.ability3+1)*10), this.pos.x, this.pos.y);
                
 }
        })));
        me.game.world.addChild(game.data.buytext, 35);
    },
    
    stopBuying: function(){
        this.buying = true; 
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20)
        me.game.world.removeChld(game.data.buyscreen);
        me.input.unbindKey(me.input.F1, "F1", true);
        me.input.unbindKey(me.input.F1, "F2", true);
        me.input.unbindKey(me.input.F1, "F3", true);
        me.input.unbindKey(me.input.F1, "F4", true);
        me.input.unbindKey(me.input.F1, "F5", true);
        me.input.unbindKey(me.input.F1, "F6", true);
    }
    
});




