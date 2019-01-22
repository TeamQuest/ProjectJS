class Constants {
    static get PLAYER_SPAWN_X() { return 75; }
    static get PLAYER_SPAWN_Y() { return 75; }

    static get CAMERA_ZOOM() { return 2; }
}

class Assets {
    static get SPRITESHEET_CHARACTERS() { return '../assets/characters/sprites-character.png'; }
    static get SPRITESHEET_CHARACTERS_JSON() { return '../assets/characters/sprites-character.json'; }
    static get TILES() { return '../assets/tiles/tileset.png'; }
    static get TILES_JSON() { return '../assets/tiles/tilemap.json'; }
}

const EqInfo = {

    SWORD: function() {
      return {
        name:"SWORD",
        damage: 20,
        describ:"training laga",
        asset:"../assets/items/Item__01.png"}
    },

    POTION: function() {
      return {
        name:"POTION",
        describ:"Potion gives you health",
        asset:"../assets/items/Item__29.png"}
    },
    SILVER_KEY: function() {
      return {
        name:"SILVER_KEY",
        describ:"Mystery key",
        asset:"../assets/items/Item__69.png"}
    },
    GOLD_KEY: function() {
      return {
        name:"GOLD_KEY",
        describ:"Better than silver key",
        asset:"../assets/items/Item__68.png"}
    },
    APPLE: function() {
      return {
        name:"APPLE",
        describ:"Gives you health ",
        asset:"../assets/items/Item__64.png"}
    },
    POIS_LAG: function() {
      return {
        name:"POIS_LAG",
        describ:"Poison laga hurts you!",
        asset:"../assets/items/Item__21.png"}
    },
    SPECIAL_MARKER: function() {
      return {
        name:"SPECIAL_MARKER",
        describ:"ONLY FOR DEVELOPMENT",
        asset:"../assets/items/Item__24.png"}
    },
    ARMOR: function() {
      return {
        name:"ARMOR",
        describ:"it looks nice! :)",
        asset:"../assets/items/Item__59.png"}
    },



};

const ITEMS_KINDS = [ EqInfo.SWORD(),
                      EqInfo.POTION(),
                      EqInfo.SILVER_KEY(),
                      EqInfo.GOLD_KEY(),
                      EqInfo.APPLE(),
                      EqInfo.POIS_LAG(),
                      EqInfo.SPECIAL_MARKER(),
                      EqInfo.ARMOR(),
                    ]
