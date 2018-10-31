const config = {
    type: Phaser.AUTO,
    title: 'ProjectJS',
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
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

function drawColliders(ref, layer) {
    const debugGraphics = ref.add.graphics().setAlpha(0.75);
    layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}

function preload() {
    this.load.image('white', '../assets/characters/white.jpg');
    this.load.image('tiles', '../assets/tiles/blackvolution.png');
    this.load.tilemapTiledJSON({
        key: 'map',
        url: '../assets/tiles/blackvolution.json',
    });
}

function create() {
    // Create tileset from the map
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('bvtiles', 'tiles');
    // Tile layers under the character
    const walkable_l = map.createStaticLayer('walkable', tileset, 0, 0);
    const world_l = map.createStaticLayer('world', tileset, 0, 0);
    // Set up collision for tiles with property `collides`
    world_l.setCollisionByProperty({ collides: true });
    // Player initialization
    player = new Character('Unknown');
    player.attachSprite(this.physics.add.sprite(256, 112, 'white'));
    player.setController(this.input.keyboard.createCursorKeys());
    this.physics.add.collider(player.sprite, world_l);
    // Tile layer above the character
    const above_l = map.createStaticLayer('above', tileset, 0, 0);

    // DEBUG: draw collision bounds
    drawColliders(this, world_l);
}

function update() {
    player.update();
}

