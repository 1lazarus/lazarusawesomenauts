game.PlayerEnity = me.Entity.extend({
    init:function(x, y, settings){
    this._super(me.Entity, 'init', [x, y,{
            image: "player",
            width: 64,
            height: 64,
            spritewidth: "64",
            spriteheight: "64",
            getShape: function(){
                return(new me.Rect(0,0,64,64)).toPoloygon();
            }
    }]);
  this.body.setVelocity(5,0);
    },
    update:function(){
        if(me.input.isKeyPressed("right")){
            //sets the position of my x by  the velocity defined above in
            //setVelocity() and multiplying it by me.timmer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x+= this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x=0;
        }
    }
});