var ActionsMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

        function ActionsMenu(x, y, scene) {
            Menu.call(this, x, y, scene);
            this.addMenuItem('Attack');
            this.addMenuItem('Run');
        },
    confirm: function () {
        if (this.menuItems[this.menuItemIndex].text === "Attack") {
            this.scene.events.emit('SelectEnemies');
        }
        if (this.menuItems[this.menuItemIndex].text === "Run") {
            this.scene.events.emit('RunAway');
        }
    }
});