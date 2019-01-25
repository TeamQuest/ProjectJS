let controls;
let player;
let map;
let tileset;
let registry = null;
const dialog = (text) => player.sprite.scene.registry.set('dialog', text);
let graphics = null;  // for debugging
const layers = {
    "walkable": null,
    "world": null,
    "above": null
}
const sprites = {
    "player": null,
    "npc1": null
}
// NPC objects
const npcs = {
    "npc1": new NPC(275, 175, { x: 258, y: 100 }, { x: 292, y: 200 })
}
const group = {
    "eq": null,
    "inventory": null
}
const quests = {
    bringPotion: Object.assign(new Quest(), {
        begin() {
            dialog('Hello, friend.\nI lost my potion\nCould you help me find it?');
        },
        require() {
            const itemFound = player.hasItem('POTION');
            if (itemFound) {
                player.removeItem('POTION');
            }
            return itemFound;
        },
        idle() {
            dialog('It is a red potion.\nPlease help me find it.');
        },
        giveReward() {
            registry.set('hp', player.stats.maxhp);
            registry.set('power', player.stats.power + 2);
            dialog('Aaah... You have found my potion!\nThank you. This is your reward.');
            npcs.npc1.assignQuest(quests.smallTalk);
        }
    }),
    smallTalk: Object.assign(new Quest(), {
        begin() {
            dialog('Have a good day, traveller.');
        },
        giveReward() {
            dialog('Good bye, traveller.');
        }
    })
}

let musicOn = true;
let music = null;

// Draws AABB box of the player (DEBUG)
function drawPlayerCollider() {
    player.sprite.body.drawDebug(graphics);
}

class Game extends Phaser.Scene {

    constructor() {
        super({key: "Game"});
    }

    init(data) {
        this.characterGender = data.gender;
    }

    preload() {
        console.log('Preloading resources ...');
        this.load.audio('music', ['../assets/music/music.mp3']);
        this.load.atlas('character-sprites',
            Assets.SPRITESHEET_CHARACTERS,
            Assets.SPRITESHEET_CHARACTERS_JSON
        );

        this.load.image('tiles', Assets.TILES);
        this.load.tilemapTiledJSON({
            key: 'map',
            url: Assets.TILES_JSON,
        });

        eqPreload(this);
    }

    create() {
        console.log('Starting up the game ...')
        prepareMusic(this);
        prepareAnimations(this);
        setupWorldMap(this);
        createPlayer(this);
        prepareSharedVariables(this);
        // drawColliders(this);
        setCamera(this);
        prepareKeyDownListeners(this);
        createHud(this);
        setupObjectsCollision(this);
        assignQuests(this);
    }

    update(time, delta) {
        player.update();
    }

}

function setupObjectsCollision(that) {
    that.physics.add.overlap(player.sprite, group.eq, collectEq, null, that);
    that.physics.add.collider(sprites.player, sprites.npc1);
    for (var id in npcs) {
        sprites[id].body.immovable = true;
        sprites[id].body.moves = false;
    }
}

function prepareSharedVariables(that) {
    that.registry.set('hp', player.stats.hp);
    that.registry.set('power', player.stats.power);
    that.registry.set('dialog', '');
}

function createHud(that) {
    that.scene.run('Hud', {player: player});
}


function eqPreload(that) {
    that.load.spritesheet(EqInfo.POTION().name,
        EqInfo.POTION().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.SWORD().name,
        EqInfo.SWORD().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.SILVER_KEY().name,
        EqInfo.SILVER_KEY().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.GOLD_KEY().name,
        EqInfo.GOLD_KEY().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.APPLE().name,
        EqInfo.APPLE().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.POIS_LAG().name,
        EqInfo.POIS_LAG().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.SPECIAL_MARKER().name,
        EqInfo.SPECIAL_MARKER().asset,
        {frameWidth: 16, frameHeight: 16}
    );
    that.load.spritesheet(EqInfo.ARMOR().name,
        EqInfo.ARMOR().asset,
        {frameWidth: 16, frameHeight: 16}
    );
}

function prepareEqOnMap(that) {
    group.eq = that.physics.add.group();
    group.eq.create(200, 300, EqInfo.POTION().name, 0);
    group.eq.create(600, 500, EqInfo.POTION().name, 0);
    group.eq.create(100, 150, EqInfo.SWORD().name, 0);
    group.eq.create(100, 500, EqInfo.GOLD_KEY().name, 0);
    group.eq.create(420, 376, EqInfo.SILVER_KEY().name, 0);
    group.eq.create(600, 250, EqInfo.APPLE().name, 0);
    group.eq.create(550, 200, EqInfo.POIS_LAG().name, 0);
    group.eq.create(250, 200, EqInfo.ARMOR().name, 0);
}

function collectEq(player_s, item) {
    item.disableBody(true, true);
    console.log("Picked " + item.texture.key);
    player.items.push(item.texture.key);
}

function displayNPCsOnMap(that) {
    sprites.npc1 = that.physics.add.sprite(
        npcs.npc1.position.x,
        npcs.npc1.position.y,
        'character-sprites',
        'sprite35'
    );
    npcs.npc1.attachSprite(sprites.npc1);
}

function assignQuests(that) {
    npcs.npc1.assignQuest(quests.bringPotion);
}

function setupWorldMap(that) {
    console.log('Loading the world ...');
    // Create tileset from the map
    map = that.make.tilemap({key: 'map'});
    tileset = map.addTilesetImage('tileset', 'tiles');
    // Tile layer under the character
    layers.walkable = map.createStaticLayer('walkable', tileset, 0, 0);
    // Tile layer around the character
    layers.world = map.createStaticLayer('world', tileset, 0, 0);
    // Set up collision for tiles with property `collides`
    layers.world.setCollisionByProperty({collides: true});
    // Player's sprite must be drawn between two layers

    // NPCs have to be drawn before the player
    displayNPCsOnMap(that);
    sprites.player = that.physics.add.sprite(
        Constants.PLAYER_SPAWN_X,
        Constants.PLAYER_SPAWN_Y,
        'character-sprites', characterGender == "male" ? "sprite32" : "sprite55"
    );

    prepareEqOnMap(that);
    // Tile layer above the character
    layers.above = map.createStaticLayer('above', tileset, 0, 0);
}

function prepareAnimations(that) {
    switch (characterGender) {
        case 'male':
            that.anims.create({
                key: 'playerLeft',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 65,
                    end: 63
                }),
                frameRate: 10,
                repeat: -1
            });
            that.anims.create({
                key: 'playerRight',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 96,
                    end: 94
                }),
                frameRate: 10,
                repeat: -1
            });
            that.anims.create({
                key: 'playerUp',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 3,
                    end: 1
                }),
                frameRate: 10,
                repeat: -1
            });
            that.anims.create({
                key: 'playerDown',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 34,
                    end: 32
                }),
                frameRate: 10,
                repeat: -1
            });
            break;

        case 'female':
            that.anims.create({
                key: 'playerLeft',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 87,
                    end: 85
                }),
                frameRate: 10,
                repeat: -1
            });
            that.anims.create({
                key: 'playerRight',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 110,
                    end: 108
                }),
                frameRate: 10,
                repeat: -1
            });
            that.anims.create({
                key: 'playerUp',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 25,
                    end: 23
                }),
                frameRate: 10,
                repeat: -1
            });
            that.anims.create({
                key: 'playerDown',
                frames: that.anims.generateFrameNames('character-sprites', {
                    prefix: "sprite",
                    start: 56,
                    end: 54
                }),
                frameRate: 10,
                repeat: -1
            });
            break;
    }
}

function createPlayer(that) {
    console.log('Creating character ...');
    player = new Character('Unknown');
    player.attachSprite(sprites.player);
    player.attachController(that.input.keyboard.createCursorKeys());
    that.physics.add.collider(player.sprite, layers.world);
}

function setCamera(that) {
    // Main camera
    const camera = that.cameras.main;
    camera.setZoom(Constants.CAMERA_ZOOM);
    // Constrain camera with world bounds
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(player.sprite);

    // DEBUG: Allow camera control with arrow keys
    // const cursors = this.input.keyboard.createCursorKeys();
    // controls = new Phaser.Cameras.Controls.FixedKeyControl({
    //     camera: camera,
    //     left: cursors.left,
    //     right: cursors.right,
    //     up: cursors.up,
    //     down: cursors.down,
    //     speed: 0.1
    // });
}

function drawColliders(ref) {
    // DEBUG: draw collision bounds
    const debugGraphics = ref.add.graphics().setAlpha(0.75);
    layers.world.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
    graphics = debugGraphics;
}

function prepareMusic(that) {
    musicOn = true;

    music = that.sound.add('music');
    music.setLoop(true);
    music.play();

}

function prepareKeyDownListeners(that) {
    registry = player.sprite.scene.registry;
    that.input.keyboard.on('keydown_M', function (event) {
        if (musicOn) {
            musicOn = false;
            music.pause()
        } else {
            musicOn = true;
            music.resume()
        }
    });

    that.input.keyboard.on('keydown_I', function (event) {
        that.scene.pause('Game');
        that.scene.run('Inventory', {player: player});
    });
}
