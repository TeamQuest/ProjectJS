class Hud extends Phaser.Scene {

    constructor() {
        super({key: "Hud"});
        this.dialogEvent = {
            destroy() {}
        };
    }

    init(data) {
        this.player = data.player;
    }

    create() {
        this.hpText = this.add.text(20, 20, 'Health: ' + player.stats.hp, {
            fill: '#000',
            fontSize: '30px',
            fontFamily: 'Comic Sans MS'
        });
        this.powerText = this.add.text(20, 50, 'Power: ' + player.stats.power, {
            fill: '#000',
            fontSize: '30px',
            fontFamily: 'Comic Sans MS'
        });

        this.dialogText = this.add.text(300, 400, '', {
            fill: '#000',
            fontSize: '20px',
            fontFamily: 'Comic Sans MS'
        });
        this.dialogFight = this.add.text(200, 20, '', {
            fill: '#FFF',
            fontSize: '20px',
            fontFamily: 'Comic Sans MS'
        });

        this.registry.events.on('changedata', this.updateData, this);

    }

    update(time, delta) {
    }

    updateData(parent, key, data) {
        if (key === 'hp') {
            this.hpText.setText('Health: ' + data);
        }
        else if (key === 'power') {
            this.powerText.setText('Power: ' + data);
        }
        else if (key === 'dialog') {
            this.dialogText.setText(data);
            this.dialogEvent.destroy();
            this.dialogEvent = this.time.addEvent({
              delay: 3500,
              callback: resetDialog,
              callbackScope: this
            });
        }
        else if (key === 'dialogFight') {
            this.dialogFight.setText(data);
            this.dialogEvent = this.time.addEvent({
              delay: 10000,
              callback: resetDialogFight,
              callbackScope: this
            });
        }
    }
}

function resetDialog()
{
  this.dialogText.setText('');
}
function resetDialogFight()
{
  this.dialogFight.setText('');
}
