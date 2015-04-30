game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('NEW-screen')), -10);
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";
        
        //registering your F1-F5 Keys
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.A);
       

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD ", this.pos.x, this.pos.y);
      
 }
        })));
        
    

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
     document.getElementById("input").style.visibility = "hidden";
     document.getElementById("register").style.visibility = "hidden";
    }
});


