class MenuItem extends Phaser.GameObjects.Text {

    constructor(x, y, text, scene) {
        super(scene, x, y, text, {color: "#ffffff", align: "left", fontSize: 20});
    }

    select() {
        this.setColor("#ff0000");
    }

    deselect() {
        this.setColor("#ffffff");
    }

    // when the associated enemy or player unit is killed
    unitKilled() {
        this.active = false;
        this.visible = false;
    }
}