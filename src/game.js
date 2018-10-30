const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let controls;

function drawColliders(ref, layer) {
    const debugGraphics = ref.add.graphics().setAlpha(0.75);
    layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}

function preload()
{
    this.load.image('tiles', '../assets/tiles/blackvolution.png');
    this.load.tilemapTiledJSON({
        key: 'map',
        url: '../assets/tiles/blackvolution.json',
    });
}

function create()
{
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('bvtiles', 'tiles');
    // Create layers
    const walkable_l = map.createStaticLayer('walkable', tileset, 0, 0);
    const world_l = map.createStaticLayer('world', tileset, 0, 0);
    const above_l = map.createStaticLayer('above', tileset, 0, 0);
    // Set up collision for tiles with property `collides`
    world_l.setCollisionByProperty({ collides: true });

    // DEBUG: Draw collision bounds
    drawColliders(this, world_l);

    // Main camera
    const camera = this.cameras.main;
    camera.setZoom(2);
    // Constrain camera with world bounds
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // DEBUG: Allow camera control with arrow keys
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.1
    });
}

function update(time, delta)
{
    // Update camera movement
    controls.update(delta)
}

