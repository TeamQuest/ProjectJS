class EndGame extends Phaser.Scene {

    constructor() {
        super({key: "EndGame"});
    }

    create() {
        this.playButton = this.add.text(100, 150, 'YOU DIED :(!', {
            fill: '#0f0',
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: 'Comic Sans MS'
        })
            .setInteractive()
            .on('pointerdown', function (event) {
                this.scene.start('MainMenu');
            }, this)
            .on('pointerover', function (event) {
                this.playButton.setStyle({fill: '#ff0'});
            }, this)
            .on('pointerout', function (event) {
                this.playButton.setStyle({fill: '#0f0'});
            }, this);
    }
}

