class NPC {
    constructor(posx, posy, interactAreaTopLeft, interactAreaBottomRight) {
        // Only ONE quest at once
        this.quest = null;
        this.position = {x: posx, y: posy};
        this.area = {
            topleft: { x: interactAreaTopLeft.x, y: interactAreaTopLeft.y },
            bottomright: { x: interactAreaBottomRight.x, y: interactAreaBottomRight.y },
            topright: { x: interactAreaBottomRight.x, y: interactAreaTopLeft.y },
            bottomleft: { x: interactAreaTopLeft.x, y: interactAreaBottomRight.y },
        };
    }

    attachSprite(sprite) {
        this.sprite = sprite;
    }

    assignQuest(quest) {
        quest.reset();
        this.quest = Object.assign(new Quest(), quest);
    }

    startQuest() {
        this.quest.start();
    }

    isClose(posx, posy) {
        return !!(posx >= this.area.topleft.x &&
                  posx <= this.area.topright.x &&
                  posy >= this.area.topleft.y &&
                  posy <= this.area.bottomleft.y);
    }
}

/*
                 [BR.x, TL.y]
        TL -------- TR
        |          |
        |   AREA   |
        |          |
        |          |
        BL -------- BR
   [TL.x, BR.y]
 */
