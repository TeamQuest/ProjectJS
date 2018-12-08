
class MainMenu extends Phaser.Scene {

    constructor() {
        super({key: "MainMenu"});
        this.help_message = 
            'Press arrows to move around\n'
            // + 'Use `E` to interact\n'
            + 'Have fun!'
    }

    create() {
        this.text = this.add.text(200, 60, 'Welcome to the game!', {
            fill: '#fff',
            fontSize: '40px',
            fontFamily: 'Comic Sans MS'
        });
        this.help_message_txt = this.add.text(500, 500, this.help_message, {
            fill: '#fff',
            fontSize: '15px',
            fontFamily: 'Comic Sans MS',
        });
        this.playButton = this.add.text(100, 150, '* Play!', {
            fill: '#0f0',
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: 'Comic Sans MS'
        })
            .setInteractive()
            .on('pointerdown', function (event) {
                this.scene.start('CreateCharacter');
            }, this)
            .on('pointerover', function (event) {
                this.playButton.setStyle({ fill: '#ff0'});
            }, this)
            .on('pointerout', function (event) {
                this.playButton.setStyle({ fill: '#0f0' });
            }, this);

        this.settingsButton = this.add.text(100, 220, '* Settings', {
            fill: '#0f0',
            fontSize: '50px',
            fontStyle: 'bold',
            fontFamily: 'Comic Sans MS'
        })
        .setInteractive()
        .on('pointerdown', function (event) {
         }, this)
        .on('pointerover', function (event) {
            this.clickButton2.setStyle({ fill: '#ff5'});
        }, this)
        .on('pointerout', function (event) {
            this.clickButton2.setStyle({ fill: '#0f1' });
        },this );

  }
}
