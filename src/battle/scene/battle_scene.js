class BattleScene extends Phaser.Scene {

    constructor() {
        super({key: 'BattleScene'});
    }

    switch() {
        // this.enemy = data.enemy;
    }

    preload() {
        // load resources
        this.load.image('angry_flower', 'assets/enemies/angry_flower.png');
        this.load.image('skeleton', 'assets/enemies/skeleton.png');
        this.load.image('bat', 'assets/enemies/bat.png');
        this.load.image('slime', 'assets/enemies/slime.png');
        this.load.image('ghost', 'assets/enemies/ghost.png');

        this.load.image('male_face', 'assets/characters/male_face.png');
        this.load.image('female_face', 'assets/characters/female_face.png');
    }

    create() {

        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

        this.startBattle();

        this.sys.events.on('wake', this.startBattle, this);

    }

    startBattle() {
        let whichFace;
        if (characterGender == "male") {
            whichFace = 'male_face';
        } else {
            whichFace = 'female_face';
        }

        let playerCharacter = new PlayerCharacter(this, 625, 125, whichFace, 1, player.name, player.stats.hp, player.stats.power);

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
    }

    nextTurn() {
        // if we have victory or game over
        if (this.checkIfEnemyLives()) {
            this.endBattle();
            this.exitBattle()
            return;
        }

        // check if hero lives
        this.isGameOver();

        // currently active unit
        this.index++;
        // if there are no more units, we start again from the first one
        if (this.index >= this.units.length) {
            this.index = 0;
        }
        // if its player hero
        if (this.units[this.index] instanceof PlayerCharacter) {
            // we need the player to select action and then enemy
            this.events.emit("PlayerSelect");
        } else { // else if its enemy unit
            // call the enemy's attack function
            if (this.units[this.index] != null && this.units[this.index].living && this.heroes[0].living) {
                this.units[this.index].attack(this.heroes[0]);
            }
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({delay: 2500, callback: this.nextTurn, callbackScope: this});
            // this.nextTurn()
        }
    }

    receivePlayerSelection(action, target) {
        if (action === 'flee') {
            player.stats.hp -= 10
            if( player.stats.hp  <=0){
                player.stats.hp = 1;
            }
            registry.set('hp', player.stats.hp);
            this.endBattle();
            this.exitBattle();
        }
        if (action === 'attack') {
            this.heroes[0].attack(this.enemies[target]);
            this.time.addEvent({delay: 2500, callback: this.nextTurn, callbackScope: this});
        }
    }

    wake() {
        this.scene.run('UIScene');
        this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
    }

    checkIfEnemyLives() {
        var victory = true;
        // if all enemies are dead we have victory
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].living) {
                victory = false;
            }
        }
        return victory;
    }

    isGameOver() {

        // if all heroes are dead we have game over
        if (!this.heroes[0].living) {

            this.endBattle();
            this.scene.stop('UIScene');
            this.scene.stop('BattleScene');
            this.scene.stop('Game');
            this.scene.start('EndGame');
            music.stop();
        }
    }

    endBattle() {
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for (var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();
        }
        this.units.length = 0;
    }

    exitBattle() {
        this.scene.stop('UIScene');
        this.scene.stop('BattleScene');
        this.scene.wake('Game');
    }

}