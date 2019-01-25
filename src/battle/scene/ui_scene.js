var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function UIScene() {
            Phaser.Scene.call(this, {key: 'UIScene'});
        },

    create: function () {

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(5, 375, 225, 250);
        this.graphics.fillRect(5, 375, 225, 250);
        this.graphics.strokeRect(237.5, 375, 225, 250);
        this.graphics.fillRect(237.5, 375, 225, 250);
        this.graphics.strokeRect(470, 375, 325, 250);
        this.graphics.fillRect(470, 375, 325, 250);

        // basic container to hold all menus
        this.menus = this.add.container();

        this.heroesMenu = new HeroesMenu(487.5, 382.5, this);
        this.actionsMenu = new ActionsMenu(250, 382.5, this);
        this.enemiesMenu = new EnemiesMenu(20, 382.5, this);

        // the currently selected menu
        this.currentMenu = this.actionsMenu;

        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('BattleScene');

        // listen for keyboard events
        this.input.keyboard.on('keydown', this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);

        // when the scene receives wake event
        this.sys.events.on('wake', this.createMenu, this);

        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.createMenu();
    },
    createMenu: function () {
        // map hero menu items to heroes
        this.remapHeroes();
        // map enemies menu items to enemies
        this.remapEnemies();
        // first move
        this.battleScene.nextTurn();
    },
    remapHeroes: function () {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    },
    remapEnemies: function () {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function (event) {
        if (this.currentMenu && this.currentMenu.selected) {
            if (event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if (event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if (event.code === "ArrowRight" || event.code === "Shift") {

            } else if (event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            }
            // else if (event.code === "ArrowUp") {
            //
            // }
        }
    },
    onPlayerSelect: function () {
        this.heroesMenu.select(0);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    },
    onSelectEnemies: function () {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    },
    onEnemy: function (index) {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    },
});