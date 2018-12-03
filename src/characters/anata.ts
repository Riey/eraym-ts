import {Character, CharacterEventType} from "../sys/character";

export class Anata extends Character {
    constructor() {
        super();

        this.name = "당신";
        this.callName = "당신";
    }

    getNo(): number | null {
        return 0;
    }

    doEvent(type: CharacterEventType) {
        super.doEvent(type);
    }
}
