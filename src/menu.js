
class MainMenu extends Phaser.Scene {

    constructor() {
        super({key: "MainMenu"});
    }

    create() {
        this.text = this.add.text(100, 100, 'Welcome to the game!', { fill: '#ffffff' });
        this.playerButton = this.add.text(100, 150, '* Play!', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', function (event) {
                this.scene.start('Game');
            }, this)
            .on('pointerover', function (event) {
                this.playerButton.setStyle({ fill: '#ff0'});
            }, this)
            .on('pointerout', function (event) {
                this.playerButton.setStyle({ fill: '#0f0' });
            }, this );

        this.settingsButton = this.add.text(100, 180, '* Settings', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', function (event) {
                // TODO
            }, this)
            .on('pointerover', function (event) {
                this.settingsButton.setStyle({ fill: '#ff5'});
            }, this)
            .on('pointerout', function (event) {
                this.settingsButton.setStyle({ fill: '#0f1' });
            }, this);
    }

}

