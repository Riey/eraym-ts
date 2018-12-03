import {Character} from "./character";
import {GameBase} from "./gameBase";

export class Money {
    current: number;
    goal: number;
}

export class Day {
    current: number;
    end: number | null;
}

export enum Difficulty {
    Easy = 0,
    Normal = 1,
    Hard = 2,
    Lunatic = 3,
    Phantasm = 4,
}

export class Flag {
    difficulty: Difficulty;
}

export class SaveInfo {
    description: string;
    date: Date;
}

export class VariableData {
    saveInfo: SaveInfo;

    characters: Character[];
    day: Day;
    date: Date;
    money: Money;
    gameBase: GameBase;

    master: number;
    target: number | null;
    assi: number | null;

    constructor(gameBase: GameBase) {
        this.gameBase = gameBase;

        this.characters = [];
        this.money = {
            current: 0,
            goal: 0,
        };
        this.day = {
            current: 0,
            end: 0,
        };
        this.saveInfo = {
            date: new Date(),
            description: "",
        };
        this.assi = null;
        this.master = 0;
        this.target = null;
    }

    getMaster(): Character | undefined {
        return this.characters[this.master];
    }

    getTarget(): Character | undefined {
        return this.characters[this.target];
    }

    getAssi(): Character | undefined {
        return this.characters[this.assi];
    }
}
