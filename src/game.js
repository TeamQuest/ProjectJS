const config = {
    type: Phaser.AUTO,
    title: 'ProjectJS',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
        }
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let worldLayer;
let map;
let tileset;

const SPAWN_X = 256;
const SPAWN_Y = 112;

function preload() {
    this.load.image('white', '../assets/characters/white.jpg');

    this.load.atlas('sprite',
        '../assets/characters/spritesheet.png',
        '../assets/characters/spritesheet.json'
    );

    this.load.image('tiles', '../assets/tiles/blackvolution.png');
    this.load.tilemapTiledJSON({
        key: 'map',
        url: '../assets/tiles/blackvolution.json',
    });
}

function create() {

    createWorld(this);

    createAnimations(this);

    createPlayer(this);

    drawColliders(this, worldLayer);

    // Tile layer above the character
    const aboveLayer = map.createStaticLayer('above', tileset, 0, 0);
}

function update() {
    player.update();
}

function createWorld(thiz) {
    // Create tileset from the map
    map = thiz.make.tilemap({key: 'map'});
    tileset = map.addTilesetImage('bvtiles', 'tiles');

    // Tile layers under the character
    const walkableLayer = map.createStaticLayer('walkable', tileset, 0, 0);
    worldLayer = map.createStaticLayer('world', tileset, 0, 0);

    // Set up collision for tiles with property `collides`
    worldLayer.setCollisionByProperty({collides: true});
}

function createAnimations(thiz){
    thiz.anims.create({
        key: 'playerLeft',
        frames: thiz.anims.generateFrameNames('sprite', {
            prefix: "sprite",
            start: 63,
            end: 65
        }),
        frameRate: 10,
        repeat: -1
    });
    thiz.anims.create({
        key: 'playerRight',
        frames: thiz.anims.generateFrameNames('sprite', {
            prefix: "sprite",
            start: 94,
            end: 96
        }),
        frameRate: 10,
        repeat: -1
    });
    thiz.anims.create({
        key: 'playerUp',
        frames: thiz.anims.generateFrameNames('sprite', {
            prefix: "sprite",
            start: 1,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    thiz.anims.create({
        key: 'playerDown',
        frames: thiz.anims.generateFrameNames('sprite', {
            prefix: "sprite",
            start: 32,
            end: 34
        }),
        frameRate: 10,
        repeat: -1
    });
}

function createPlayer(thiz) {
    player = new Character('Unknown');
    player.attachSprite(thiz.physics.add.sprite(SPAWN_X, SPAWN_Y, 'sprite'));
    player.setController(thiz.input.keyboard.createCursorKeys());
    this.physics.add.collider(player.sprite, worldLayer);
}


function drawColliders(ref, layer) {
    // DEBUG: draw collision bounds
    const debugGraphics = ref.add.graphics().setAlpha(0.75);
    layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}

