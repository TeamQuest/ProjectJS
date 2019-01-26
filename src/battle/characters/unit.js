class Unit extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame);
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage
        this.living = true;
        this.menuItem = null;
        this.scene = scene;
    }

    // we will use this to notify the menu item when the unit is dead
    setMenuItem(item) {
        this.menuItem = item;
    }

    // attack the target unit
    attack(target) {
        if (target.living) {

            let tenPercDmg = this.damage * 0.2;
            let minDmg = this.damage - tenPercDmg;
            let inflictedDmg = Math.floor(Math.random() * (this.damage - minDmg + 1) + minDmg);
            target.takeDamage(inflictedDmg);
            if (target.type === player.name) {
                let heroHP = registry.get('hp');
                registry.set('hp', heroHP - inflictedDmg);
                player.stats.hp -= inflictedDmg;
            }
            //  this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + inflictedDmg + " damage");
            dialogFight(this.type + " attacks " + target.type + " for " + inflictedDmg + " damage");
        }
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.menuItem.unitKilled();
            this.living = false;
            this.visible = false;
            this.menuItem = null;
        }
    }
}
