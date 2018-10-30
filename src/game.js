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
    const walkable_l = map.createStaticLayer('walkable', tileset, 0, 0);
    const world_l = map.createStaticLayer('world', tileset, 0, 0);
    const above_l = map.createStaticLayer('above', tileset, 0, 0);
}

function update()
{
}

