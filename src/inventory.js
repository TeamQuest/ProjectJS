class Inventory extends Phaser.Scene {

    constructor() {
        super({key: "Inventory"});
        this.var = 10;
    }

    init(data) {
        this.player = data.player;
    }

    preload() {

        eqPreload(this);

    }

    create() {

        console.log('Inventory open');

        this.writeItems();
        prepareKeyDownListenersInv(this);
    }

    writeItems() {

        showInventoryTitle(this);

        group.inventory = this.physics.add.group();

        for(var i =0 ; i <   this.player.items.length ; i++ )
        {
            var itemName = this.player.items[i].texture.key;
            var item = ITEMS_KINDS.find(function(element) {
                return element.name == itemName;
            });

            group.inventory.create(200,215+i*20, itemName ,0).setInteractive();

            this.text = this.add.text(220, 200+i*20 ,itemName , {
                fill: '#000',
                fontSize: '20px',
                fontFamily: 'Comic Sans MS'
            });

            this.text = this.add.text(350, 200+i*20, item.describ , {
                fill: '#000',
                fontSize: '20px',
                fontFamily: 'Comic Sans MS'
            });
        }

        this.input.on('gameobjectup', this.clickHandler, this);

    }

    clickHandler (pointer, item)
    {
        var itemName = item.texture.key;
        var item = ITEMS_KINDS.find(function(element) {
            return element.name == itemName;
        });

        console.log("clicked" + itemName)

        if (itemName == "POTION_RED")
        {
            var localHP = this.registry.get('hp');
            this.registry.set('hp', localHP+50 );
        }
        if(itemName == "SWORD")
        {
          this.registry.set('power', 30 );
        }
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
    that.load.spritesheet(EqInfo.SILVER_KEY().name,
      EqInfo.SILVER_KEY().asset,
      { frameWidth: 16, frameHeight: 16 }
    );
    that.load.spritesheet(EqInfo.GOLD_KEY().name,
      EqInfo.GOLD_KEY().asset,
      { frameWidth: 16, frameHeight: 16 }
    );
    that.load.spritesheet(EqInfo.APPLE().name,
      EqInfo.APPLE().asset,
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
