class ActionsMenu extends Menu {

    constructor(x, y, scene) {
        super(x, y, scene);
        this.addMenuItem('Attack');
        this.addMenuItem('Run');
    }

    confirm() {
        if (this.menuItems[this.menuItemIndex].text === "Attack") {
            this.scene.events.emit('SelectEnemies');
        }
        if (this.menuItems[this.menuItemIndex].text === "Run") {
            this.scene.events.emit('RunAway');
        }
    }
}