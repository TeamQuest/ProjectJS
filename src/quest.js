class Quest {
    constructor() {
        this.reset();
    }

    reset() {
        this.isDone = false;
        this.isRunning = false;
    }

    start() {
        if (this.isDone) {
            console.log('I have no more quests for you.')
            return;
        }
        if (this.isRunning) {
            this.continueOn();
        } else {
            this.begin();
            this.isRunning = true;
        }
    }
    
    continueOn() {
        if (this.areTasksCompleted()) {
            this.finishQuest();
        } else {
            console.log('...');
        }
    }

    finishQuest() {
        this.giveReward();
        this.isDone = true;
    }

    areTasksCompleted() {
        // Convert function output to boolean
        return !!this.require();
    }

    begin() {
        // Things that happen at the beginning of the quest
        // Should be overriden
        return;
    }

    require() {
        // Predicate whether requirements are satisfied
        // Should be overriden
        return false;
    }

    idle() {
        // What happens when you interact during unfinished quest
        // Should be overriden
        return;
    }

    giveReward() {
        // When quest has just been finished and player is rewarded
        // Should be overriden
        return;
    }
}
