export const enum Sex {
    Male = 0b01,
    Female = 0b10,
    Futa = 0b11,
}

export class Abl {
    technique: number;
}

export interface Talent {
    sex: Sex;

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

    getNo(): number | null {
        return null;
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
