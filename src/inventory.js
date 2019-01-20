class Inventory extends Phaser.Scene {

    constructor() {
        super({key: "Inventory"});
    }

    init(data) {
        this.player = data.player;
    }

    create() {
        console.log('Inventory open');
        showInventoryTitle(this)
        prepareKeyDownListenersInv(this);
    }
}

function prepareKeyDownListenersInv(that){

    that.input.keyboard.on('keydown_I', function (event) {
        that.scene.wake("Game");
        that.scene.stop('Inventory');

    });
}

function showInventoryTitle(that)
{
  that.text = that.add.text(200, 60, 'Inventory!', {
      fill: '#000',
      fontSize: '70px',
      fontFamily: 'Comic Sans MS'
  });
}
