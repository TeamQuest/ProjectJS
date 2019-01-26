class UIScene extends Phaser.Scene {

    constructor() {
        super({key: 'UIScene'});
    }

    create() {

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(5, 375, 390, 250);
        this.graphics.fillRect(5, 375, 390, 250);
        this.graphics.strokeRect(400, 375, 390, 250);
        this.graphics.fillRect(400, 375, 390, 250);

        // basic container to hold all menus
        this.menus = this.add.container();
        //
        this.actionsMenu = new ActionsMenu(420, 382.5, this);
        this.enemiesMenu = new EnemiesMenu(20, 382.5, this);

        // the currently selected menu
        this.currentMenu = this.actionsMenu;

        // add menus to the container
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('BattleScene');

        // listen for keyboard events
        this.input.keyboard.on('keydown', this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);

        this.events.on("Flee", this.flee, this);

        // when the scene receives wake event
        this.sys.events.on('wake', this.createMenu, this);

        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.createMenu();
    }

    createMenu() {
        // map enemies menu items to enemies
        this.remapEnemies();
        // first move
        this.battleScene.nextTurn();
    }

    remapEnemies() {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    }

    onKeyInput(event) {
        if (this.currentMenu && this.currentMenu.selected) {
            if (event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if (event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if (event.code === "ArrowRight" || event.code === "Shift") {

            } else if (event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            }
        }
    }

    onPlayerSelect() {
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }

    onSelectEnemies() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    onEnemy(index) {
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    }

    flee() {
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('flee');
    }
}