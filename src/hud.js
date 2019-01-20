class Hud extends Phaser.Scene {

    constructor() {
        super({key: "Hud"});
    }

    init(data) {
        this.player = data.player;
    }

    create() {

        this.text = this.add.text(20, 20, 'Health:'+ player.stats.hp, {
            fill: '#000',
            fontSize: '30px',
            fontFamily: 'Comic Sans MS'
        });
        this.text = this.add.text(20, 50, 'Power:'+ player.stats.power, {
            fill: '#000',
            fontSize: '30px',
            fontFamily: 'Comic Sans MS'
        });
        //game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this)
    }
}
