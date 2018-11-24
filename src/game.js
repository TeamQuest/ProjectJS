let controls;
let player;
let map;
let tileset;
const layers = {
    "walkable": null,
    "world": null,
    "above": null
}
const sprites = {
    "player": null
}

class Game extends Phaser.Scene {

    constructor() {
        super({ key: "Game" });
    }

    preload() {
        console.log('Preloading resources ...');
        this.load.atlas('character-sprites',
            Constants.ASSET_SPRITESHEAT_PNG,
            Constants.ASSET_SPRITESHEAT_JSON
        );

        this.load.image('tiles', Constants.ASSET_TILES_PNG);
        this.load.tilemapTiledJSON({
            key: 'map',
            url: Constants.ASSET_TILES_JSON,
        });
    }

    create() {
        console.log('Starting up the game ...')

        prepareAnimations(this);
        setupWorldMap(this);
        createPlayer(this);
        drawColliders(this);
        setCamera(this);
    }

    update(time, delta) {
        player.update();
    }

}

function setupWorldMap(that) {
    console.log('Loading world ...');
    // Create tileset from the map
    map = that.make.tilemap({key: 'map'});
    tileset = map.addTilesetImage('bvtiles', 'tiles');
    // Tile layer under the character
    layers.walkable = map.createStaticLayer('walkable', tileset, 0, 0);
    // Tile layer around the character
    layers.world = map.createStaticLayer('world', tileset, 0, 0);
    // Set up collision for tiles with property `collides`
    layers.world.setCollisionByProperty({collides: true});
    // Player's sprite must be drawn between two layers
    sprites.player = that.physics.add.sprite(
        Constants.PLAYER_SPAWN_X,
        Constants.PLAYER_SPAWN_Y,
        'character-sprites'
    );
    // Tile layer above the character
    layers.above = map.createStaticLayer('above', tileset, 0, 0);
}

function prepareAnimations(that){
    that.anims.create({
        key: 'playerLeft',
        frames: that.anims.generateFrameNames('character-sprites', {
            prefix: "sprite",
            start: 63,
            end: 65
        }),
        frameRate: 10,
        repeat: -1
    });
    that.anims.create({
        key: 'playerRight',
        frames: that.anims.generateFrameNames('character-sprites', {
            prefix: "sprite",
            start: 94,
            end: 96
        }),
        frameRate: 10,
        repeat: -1
    });
    that.anims.create({
        key: 'playerUp',
        frames: that.anims.generateFrameNames('character-sprites', {
            prefix: "sprite",
            start: 1,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    that.anims.create({
        key: 'playerDown',
        frames: that.anims.generateFrameNames('character-sprites', {
            prefix: "sprite",
            start: 32,
            end: 34
        }),
        frameRate: 10,
        repeat: -1
    });
}

function createPlayer(that) {
    console.log('Creating character ...');
    player = new Character('Unknown');
    player.attachSprite(sprites.player);
    player.setController(that.input.keyboard.createCursorKeys());
    that.physics.add.collider(player.sprite, layers.world);
}

function setCamera(that){
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
}
