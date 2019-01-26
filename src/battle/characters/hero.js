class PlayerCharacter extends Unit {

    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame, type, hp, damage);
        // flip the image so I don't have to edit it manually
        this.flipX = true;

        this.setScale(2);
    }
}