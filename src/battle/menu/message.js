var Message = new Phaser.Class({

    Extends: Phaser.GameObjects.Container,

    initialize:
        function Message(scene, events) {
            Phaser.GameObjects.Container.call(this, scene, 400, 75);
            var graphics = this.scene.add.graphics();
            this.add(graphics);
            graphics.lineStyle(1, 0xffffff, 0.8);
            graphics.fillStyle(0x031f4c, 0.3);
            graphics.strokeRect(-225, -37.5, 450, 75);
            graphics.fillRect(-225, -37.5, 450, 75);
            this.text = this.scene.add.text(0, 0, "", {
                fill: '#fff',
                fontSize: 13,
                fontFamily: 'Comic Sans MS'
            });
            this.add(this.text);
            this.text.setOrigin(0.5);
            events.on("Message", this.showMessage, this);
            this.visible = false;
        },
    showMessage: function (text) {
        this.text.setText(text);
        this.visible = true;
        if (this.hideEvent) {
            this.hideEvent.remove(false);
        }
        this.hideEvent = this.scene.time.addEvent({delay: 2000, callback: this.hideMessage, callbackScope: this});
    },
    hideMessage: function () {
        this.hideEvent = null;
        this.visible = false;
    }
});