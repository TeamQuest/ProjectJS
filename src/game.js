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
let controls;
let player;
let worldLayer;
let map;
let tileset;

const PLAYER_SPAWN_X = 256;
const PLAYER_SPAWN_Y = 112;

const ASSET_SPRITESHEAT_PNG = '../assets/characters/spritesheet.png';
const ASSET_SPRITESHEAT_JSON = '../assets/characters/spritesheet.json';
const ASSET_TILES_PNG = '../assets/tiles/blackvolution.png';
const ASSET_TILES_JSON = '../assets/tiles/blackvolution.json';

const CAMERA_ZOOM = 2;

function preload() {
    this.load.atlas('sprite',
        ASSET_SPRITESHEAT_PNG,
        ASSET_SPRITESHEAT_JSON
    );

    this.load.image('tiles', ASSET_TILES_PNG);
    this.load.tilemapTiledJSON({
        key: 'map',
        url: ASSET_TILES_JSON,
    });
}

function create() {

    createWorld(this);

    createAnimations(this);

    createPlayer(this);

    drawColliders(this, worldLayer);

    // Tile layer above the character
    const aboveLayer = map.createStaticLayer('above', tileset, 0, 0);

    setCamera(this);
}

function update(time, delta) {
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
    player.attachSprite(thiz.physics.add.sprite(PLAYER_SPAWN_X, PLAYER_SPAWN_Y, 'sprite'));
    player.setController(thiz.input.keyboard.createCursorKeys());
    thiz.physics.add.collider(player.sprite, worldLayer);
}

function setCamera(thiz){
    // Main camera
    const camera = thiz.cameras.main;
    camera.setZoom(CAMERA_ZOOM);
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

function drawColliders(ref, layer) {
    // DEBUG: draw collision bounds
    const debugGraphics = ref.add.graphics().setAlpha(0.75);
    layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}

