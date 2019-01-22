const characterGenderEnum = {
    MALE: 'male',
    FEMALE: 'female',
}

var name = 'noName';
var characterGender = characterGenderEnum.MALE; //default

function myXOR(a, b) {
    return (a || b) && !(a && b);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class CreateCharacter extends Phaser.Scene {

    constructor() {
        super({key: "CreateCharacter"});
    }

    preload() {
        console.log('create character...');
    }

    create() {
        var clickedMale = false;
        var clickedFemale = false;
        var failCounter = 0;

        this.text = this.add.text(100, 100, 'Choose your character!', {fill: '#ffffff'});

        this.clickButtonMale = this.add.text(110, 150, '* Male', {fill: '#0f0'})
            .setInteractive()
            .on('pointerdown', function (event) {
                if (!clickedMale) {
                    this.clickButtonMale.setStyle({fill: '#42dcf4'});
                    clickedMale = true;
                    characterGender = characterGenderEnum.MALE;
                } else {
                    this.clickButtonMale.setStyle({fill: '#0f0'});
                    clickedMale = false;
                }
            }, this)
            .on('pointerover', function (event) {
                this.clickButtonMale.setStyle({fill: '#ff0'});
            }, this)
            .on('pointerout', function (event) {
                if (!clickedMale) {
                    this.clickButtonMale.setStyle({fill: '#0f0'});
                } else {
                    this.clickButtonMale.setStyle({fill: '#42dcf4'});
                }
            }, this);

        this.clickButtonFemale = this.add.text(210, 150, '* Female', {fill: '#0f0'})
            .setInteractive()
            .on('pointerdown', function (event) {
                if (!clickedFemale) {
                    this.clickButtonFemale.setStyle({fill: '#42dcf4'});
                    clickedFemale = true;
                    characterGender = characterGenderEnum.FEMALE;
                } else {
                    this.clickButtonFemale.setStyle({fill: '#0f0'});
                    clickedFemale = false;
                }
            }, this)
            .on('pointerover', function (event) {
                this.clickButtonFemale.setStyle({fill: '#ff0'});
            }, this)
            .on('pointerout', function (event) {
                if (!clickedFemale) {
                    this.clickButtonFemale.setStyle({fill: '#0f0'});
                } else {
                    this.clickButtonFemale.setStyle({fill: '#42dcf4'});
                }
            }, this);

        this.clickButtonPlay = this.add.text(100, 200, '*** Play ***', {fill: '#0f0'})
            .setInteractive()
            .on('pointerdown', function (event) {
                if (myXOR(clickedMale, clickedFemale)) {
                    console.log('choose "' + characterGender + '" as a player ');
                    this.scene.start('Game', {gender: characterGender});
                } else {
                    failCounter++;
                    this.text = this.add.text(100, 250 + (failCounter * 15), 'Choose one character!', {fill: getRandomColor()});
                }
            }, this)
            .on('pointerover', function (event) {
                this.clickButtonPlay.setStyle({fill: '#ff5'});
            }, this)
            .on('pointerout', function (event) {
                this.clickButtonPlay.setStyle({fill: '#0f1'});
            }, this);

    }


}
