
class MainMenu extends Phaser.Scene{

  constructor() {
    super({key: "MainMenu"});
  }

  create() {

    this.text = this.add.text(100, 100, 'Welcome to the game!', { fill: '#ffffff' });
    this.clickButton = this.add.text(100, 150, '* Play!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', function (event) {
            this.scene.start('CreateCharacter');
        }, this)
        .on('pointerover', function (event) {
            this.clickButton.setStyle({ fill: '#ff0'});
        }, this)
        .on('pointerout', function (event) {
            this.clickButton.setStyle({ fill: '#0f0' });
        },this );

        this.clickButton2 = this.add.text(100, 180, '* Settings', { fill: '#0f0' })
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
