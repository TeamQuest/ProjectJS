var config = {
    type: Phaser.AUTO,
    title: 'ProjectJS',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
        }
    },
    pixelArt: true,
    scene: [MainMenu, game]
};

var game_var = new Phaser.Game(config);
