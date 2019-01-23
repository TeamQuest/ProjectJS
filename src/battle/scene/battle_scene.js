var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BattleScene() {
            Phaser.Scene.call(this, {key: 'BattleScene'});
        },

    init: function (data) {
        this.enemy = data.enemy;
    },

    preload: function () {
        // load resources
        this.load.image('enemy', 'assets/enemies/charizard.png');
    },

    create: function () {
        // Run UI Scene at the same time
        this.scene.launch('UIScene');

        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');


        this.startBattle();

        this.sys.events.on('wake', this.startBattle, this);

    },
    startBattle: function () {
        var playerCharacter = new PlayerCharacter(this, 625, 125, 'character-sprites', 1, player.name, player.hp, player.dmg);
        this.add.existing(playerCharacter);

        var enemy = new Enemy(this, 125, 125, 'enemy', null, "enemy1", 50, 3);
        this.add.existing(enemy);

        // var enemy2 = new Enemy(this, 125, 250, 'enemy', null, "enemy2", 50, 3);
        // this.add.existing(enemy2);

        // array with heroes
        this.heroes = [playerCharacter];
        // array with enemies
        this.enemies = [enemy];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        // current active unit
        this.index = -1;
        // Run UI Scene at the same time
        this.scene.launch('UIScene');
    },
    nextTurn: function () {
        // if we have victory or game over
        if (this.checkEndBattle()) {
            this.endBattle();
            return;
        }
        do {
            // currently active unit
            this.index++;
            // if there are no more units, we start again from the first one
            if (this.index >= this.units.length) {
                this.index = 0;
            }
        } while (!this.units[this.index].living);
        // if its player hero
        if (this.units[this.index] instanceof PlayerCharacter) {
            // we need the player to select action and then enemy
            this.events.emit("PlayerSelect", this.index);
        } else { // else if its enemy unit
            // pick random living hero to be attacked
            var r;
            do {
                r = Math.floor(Math.random() * this.heroes.length);
            } while (!this.heroes[r].living)
            // call the enemy's attack function
            this.units[this.index].attack(this.heroes[r]);
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({delay: 3000, callback: this.nextTurn, callbackScope: this});
        }
    },
    receivePlayerSelection: function (action, target) {
        if (action == 'attack') {
            this.units[this.index].attack(this.enemies[target]);
        }
        this.time.addEvent({delay: 3000, callback: this.nextTurn, callbackScope: this});
    },
    wake: function () {
        this.scene.run('UIScene');
        this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
    },
    checkEndBattle: function () {
        var victory = true;
        // if all enemies are dead we have victory
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for (var i = 0; i < this.heroes.length; i++) {
            if (this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    },
    endBattle: function () {
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for (var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.stop('UIScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('Game');
    },
    exitBattle: function () {
        this.scene.stop('UIScene');
        this.scene.switch('Game');
    },

});

