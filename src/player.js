class Character {
    constructor(ref, name) {
        this.name = name;
        this.hp = 100;
        this._speed = 100;
    }

    attachSprite(sprite) {
        this.sprite = sprite;
        this.sprite.body.velocity.normalize().scale(this._speed);
        this.sprite.setCollideWorldBounds(true);
    }

    setController(controller) {
        this.controller = controller;
    }

    update() {
        // Stop any previous movement from the last frame
        this.sprite.body.setVelocity(0);

        // Horizontal movement
        if (this.controller.left.isDown) {
            this.sprite.body.setVelocityX(-this._speed);
        } else if (this.controller.right.isDown) {
            this.sprite.body.setVelocityX(this._speed);
        }
        // Vertical movement
        if (this.controller.up.isDown) {
            this.sprite.body.setVelocityY(-this._speed);
        } else if (this.controller.down.isDown) {
            this.sprite.body.setVelocityY(this._speed);
        }
    }
}
