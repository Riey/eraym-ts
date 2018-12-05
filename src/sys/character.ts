export const enum Sex {
    Male = 0b01,
    Female = 0b10,
    Futa = 0b11,
}

export interface Abl {
    technique: number;
}

export interface Talent {
    sex: Sex;
    virgin: boolean;
    forbiddenKnowledge: boolean;
}

export enum CharacterEventType {
    TrainFirst,
}

export class Character {
    name: string;
    callName: string;
    nickName: string;
    talent: Talent;
    abl: Abl;

    constructor() {
        this.name = "";
        this.callName = "";
        this.nickName = "";

        this.talent = {} as Talent;
        this.abl = {} as Abl;
    }

    getNo(): number | null {
        return null;
    }

    setSex(sex: Sex) {
        switch (sex) {
            case Sex.Male: {
                break;
            }
            case Sex.Female: {
                break;
            }
            case Sex.Futa: {
                break;
            }
        }

        this.talent.sex = sex;
    }

    doEvent(type: CharacterEventType) {
        switch (type) {
            case CharacterEventType.TrainFirst: {
                // 범용 조교시작 구상
                break;
            }
        }
    }
}
