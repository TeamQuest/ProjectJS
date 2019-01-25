class Hud extends Phaser.Scene {

    constructor() {
        super({key: "Hud"});
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
    }
}
