var config = {
    type: Phaser.AUTO,
    title: 'ProjectJS',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: true,
        }
    },
    pixelArt: true,
    scene: [MainMenu, CreateCharacter, Game, BattleScene, UIScene, Inventory, Hud, EndGame]

};

var game = new Phaser.Game(config);
