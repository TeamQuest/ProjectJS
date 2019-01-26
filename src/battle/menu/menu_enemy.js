class EnemiesMenu extends Menu {

    constructor(x, y, scene) {
        super(x, y, scene);
    }

    confirm() {
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
}