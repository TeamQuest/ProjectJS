var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BattleScene() {
            Phaser.Scene.call(this, {key: 'BattleScene'});
        },

    switch: function () {
        // this.enemy = data.enemy;
    },

    preload: function () {
        // load resources
        this.load.image('angry_flower', 'assets/enemies/angry_flower.png');
        this.load.image('skeleton', 'assets/enemies/skeleton.png');
        this.load.image('bat', 'assets/enemies/bat.png');
        this.load.image('slime', 'assets/enemies/slime.png');
        this.load.image('ghost', 'assets/enemies/ghost.png');

        this.load.image('male_face', 'assets/characters/male_face.png');
        this.load.image('female_face', 'assets/characters/female_face.png');
    },

    create: function () {

        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

        this.startBattle();

        // this.sys.events.on('wake', this.startBattle, this);

    },
    startBattle: function () {
        var playerCharacter;
        if (characterGender == "male") {
            playerCharacter = new PlayerCharacter(this, 625, 125, 'male_face', 1, player.name, player.hp, player.dmg);
        } else {
            playerCharacter = new PlayerCharacter(this, 625, 125, 'female_face', 1, player.name, player.hp, player.dmg);
        }


        this.add.existing(playerCharacter);
        // array with heroes
        this.heroes = [playerCharacter];

        var metEnemy = new Enemy(this, 125, 125, enemy.name, null, enemy.name, enemy.hp, enemy.dmg);
        this.add.existing(metEnemy);

        if (enemy.name === "skeleton") {
            var metEnemy2 = new Enemy(this, 125, 250, enemy.name, null, enemy.name, enemy.hp, enemy.dmg);
            this.add.existing(metEnemy2);
            // array with enemies
            this.enemies = [metEnemy, metEnemy2];
        } else {
            this.enemies = [metEnemy];
        }

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
        // currently active unit
        this.index++;
        // if there are no more units, we start again from the first one
        if (this.index >= this.units.length) {
            this.index = 0;
        }

        // } while (!this.enemies[this.index].living);
        // if its player hero
        if (this.units[this.index] instanceof PlayerCharacter) {
            // we need the player to select action and then enemy
            this.events.emit("PlayerSelect");
        } else { // else if its enemy unit
            // call the enemy's attack function
            if (this.units[this.index].living && this.heroes[0].living) {
                this.units[this.index].attack(this.heroes[0]);
            }
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({delay: 3000, callback: this.nextTurn, callbackScope: this});
            // this.nextTurn()
        }
    },
    receivePlayerSelection: function (action, target) {
        if (action === 'attack') {
            this.heroes[0].attack(this.enemies[target]);
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
            if (this.enemies[i].living) {
                victory = false;
            }
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        if (this.heroes[0].living) {
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
        this.scene.stop('BattleScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.wake('Game');
    },
    exitBattle: function () {
        this.scene.stop('UIScene');
        this.scene.stop('BattleScene');
        this.scene.wake('Game');
    },

});