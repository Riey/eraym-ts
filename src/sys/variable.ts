import {GameBase} from "./gameBase";
import {Character} from "./character";

export interface Money {
    current: number;
    goal: number;
}

export interface Day {
    week: number;
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

export enum GameMode {
    Ym = 0,
    AbNormal = 1,
    Prostitute = 4,
    Extra = 9,
}

export interface Flag {
    difficulty: Difficulty;
    gameMode: GameMode;
}

export interface SaveInfo {
    description: string;
    date: Date;
}

export interface House {
    capacity: number;
}

export interface Item {
    videoCamera: boolean;
    videoTape: number;
}

export class VariableData {
    saveInfo: SaveInfo;
    gameBase: GameBase;

    characters: Character[];
    day: Day;
    date: Date;
    money: Money;
    house: House;
    flag: Flag;
    item: Item;

    master: number;
    target: number | null;
    assi: number | null;

    constructor(gameBase: GameBase) {
        this.gameBase = gameBase;

        this.characters = [];
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
