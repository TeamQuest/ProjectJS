class EndGame extends Phaser.Scene {

    constructor() {
        super({key: "EndGame"});
    }

    create() {
        this.endGameButton = this.add.text(100, 150, 'YOU DIED :(!', {
            fill: '#0',
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: 'Comic Sans MS'
        })
            .setInteractive()
            .on('pointerdown', function (event) {
                this.scene.start('MainMenu');
            }, this)
            .on('pointerover', function (event) {
                this.endGameButton.setStyle({fill: '#ff0'});
            }, this)
            .on('pointerout', function (event) {
                this.endGameButton.setStyle({fill: '#f00'});
            }, this);
    }
}

