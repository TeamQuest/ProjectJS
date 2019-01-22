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

        this.load.image("inventory_background",
          "../assets/tiles/inventory.png");
    }

    create() {

        this.drawBackground();
        this.drawItems();
        prepareKeyDownListenersInv(this);
    }

    drawBackground(){
      this.add.image(370,300, 'inventory_background');
    }

    drawItems() {

        showInventoryTitle(this);
        group.inventory = this.physics.add.group();

        for( var i =0 ; i <   this.player.eq.length ; i++ )
        {
            var itemName = this.player.eq[i];
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
            this.add.sprite(175,215+i*20,EqInfo.SPECIAL_MARKER().name)
        }

        for( var i =0 ; i < this.player.items.length ; i++ )
        {
            var itemName = this.player.items[i];
            var item = ITEMS_KINDS.find(function(element) {
                return element.name == itemName;
            });

            group.inventory.create(200,215+(i+this.player.eq.length)*20, itemName ,0).setInteractive();

            this.text = this.add.text(220, 200+(i+this.player.eq.length)*20 ,itemName , {
                fill: '#000',
                fontSize: '20px',
                fontFamily: 'Comic Sans MS'
            });

            this.text = this.add.text(350, 200+(i+this.player.eq.length)*20, item.describ , {
                fill: '#000',
                fontSize: '20px',
                fontFamily: 'Comic Sans MS'
            });
        }

        this.input.on('gameobjectup', this.clickHandler, this);
    }

    clickHandler (pointer, item) {

        var itemName = item.texture.key;
        console.log("clicked: "+itemName)

        if (itemName == "POTION") {
            var localHP = this.registry.get('hp');
            this.registry.set('hp', localHP+50 );
            player.removeItem("POTION");
            this.scene.restart();
        }
        if (itemName == "APPLE") {
            var localHP = this.registry.get('hp');
            this.registry.set('hp', localHP+25 );
            player.removeItem("APPLE");
            this.scene.restart();
        }
        if(itemName == "SWORD") {

            if(this.player.eq.includes(itemName)) {
                this.player.removeEQ("SWORD")
                this.player.items.push("SWORD")
                var localPW = this.registry.get('power')

                this.registry.set('power', localPW-30 );
                this.scene.restart();
            }
            else {
                this.player.eq.push("SWORD")
                this.player.removeItem("SWORD")

                var localPW = this.registry.get('power')
                this.registry.set('power', localPW+30 );
                this.scene.restart();
            }
        }
        if(itemName == "POIS_LAG") {
            var localHP = this.registry.get('hp');
            this.registry.set('hp', localHP-10 );
            player.removeItem("POIS_LAG");
            this.scene.restart();
        }
        if(itemName == "ARMOR") {

            if(this.player.eq.includes(itemName)) {
                this.player.removeEQ("ARMOR")
                this.player.items.push("ARMOR")

                var localPW = this.registry.get('power');
                var localHP = this.registry.get('hp');

                this.registry.set('power', localPW-50 );
                this.registry.set('hp', localHP-50 );

                this.scene.restart();
            }
            else {
                this.player.eq.push("ARMOR")
                this.player.removeItem("ARMOR")
                var localPW = this.registry.get('power');
                var localHP = this.registry.get('hp');

                this.registry.set('power', localPW+50 );
                this.registry.set('hp', localHP+50 );

                this.scene.restart();
            }
        }
    }
}

function eqPreload(that) {

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
    that.load.spritesheet(EqInfo.POIS_LAG().name,
      EqInfo.POIS_LAG().asset,
      { frameWidth: 16, frameHeight: 16 }
    );
    that.load.spritesheet(EqInfo.SPECIAL_MARKER().name,
      EqInfo.SPECIAL_MARKER().asset,
      { frameWidth: 16, frameHeight: 16 }
    );
    that.load.spritesheet(EqInfo.ARMOR().name,
      EqInfo.ARMOR().asset,
      { frameWidth: 16, frameHeight: 16 }
    );
}

function prepareKeyDownListenersInv(that) {

    that.input.keyboard.on('keydown_I', function (event) {
      that.scene.wake("Game");
      that.scene.stop('Inventory');
    });
}

function showInventoryTitle(that) {
    that.text = that.add.text(200, 60, 'Inventory!', {
        fill: '#000',
        fontSize: '70px',
        fontFamily: 'Comic Sans MS'
    });
}
