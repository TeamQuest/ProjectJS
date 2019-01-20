class Inventory extends Phaser.Scene {

    constructor() {
        super({key: "Inventory"});
    }

    init(data) {
        this.player = data.player;
    }

    preload()
    {
        eqPreload(this);
    }

    create() {

        console.log('Inventory open');

        writeItems(this);
        prepareKeyDownListenersInv(this);
    }
}


function eqPreload(that)
{
  that.load.spritesheet(EqInfo.POTION_RED().name,
    EqInfo.POTION_RED().asset,
    { frameWidth: 16, frameHeight: 16 }
  );
  that.load.spritesheet(EqInfo.SWORD().name,
    EqInfo.SWORD().asset,
    { frameWidth: 16, frameHeight: 16 }
  );
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

function writeItems(that) {

    showInventoryTitle(that);

    group.inventory = that.physics.add.group();

    for(var i =0 ; i <   that.player.items.length ; i++ )
    {
        var itemName = that.player.items[i].texture.key;
        var item = ITEMS_KINDS.find(function(element) {
            return element.name == itemName;
        });

        group.inventory.create(200,215+i*20, itemName ,0);

        that.text = that.add.text(220, 200+i*20 ,itemName , {
            fill: '#000',
            fontSize: '20px',
            fontFamily: 'Comic Sans MS'
        });

        that.text = that.add.text(350, 200+i*20, item.describ , {
            fill: '#000',
            fontSize: '20px',
            fontFamily: 'Comic Sans MS'
        });
    }

}
