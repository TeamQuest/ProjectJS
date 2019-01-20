var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BattleScene() {
            Phaser.Scene.call(this, {key: 'BattleScene'});
        },

    init: function (data)
    {
        this.enemy = data.enemy;
    },

    preload: function ()
    {
        // load resources
        this.load.image('enemy', 'assets/enemies/charizard.png');
    },

    create: function () {
        // Run UI Scene at the same time
        this.scene.launch('UIScene');

        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(5, 375, 225, 250);
        this.graphics.fillRect(5, 375, 225, 250);
        this.graphics.strokeRect(237.5, 375, 225, 250);
        this.graphics.fillRect(237.5, 375, 225, 250);
        this.graphics.strokeRect(470, 375, 325, 250);
        this.graphics.fillRect(470, 375, 325, 250);

        createFIghters(this);
    }
});


function createFIghters(that) {

    var playerCharacter = new PlayerCharacter(that, 625, 125, 'character-sprites', 1, player.name, player.hp, player.dmg);
    that.add.existing(playerCharacter);

    var enemy = new Enemy(that, 125, 125, 'enemy', null, "enemy", 50, 3);
    that.add.existing(enemy);

    // array with heroes
    that.heroes = [playerCharacter];
    // array with enemies
    that.enemies = [enemy];
    // array with both parties, who will attack
    that.units = that.heroes.concat(that.enemies);

    // Run UI Scene at the same time
    that.scene.launch('UIScene');

}