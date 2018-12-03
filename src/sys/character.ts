export const enum Sex {
    Male = 0b01,
    Female = 0b10,
    Futa = 0b11,
}

export class Talent {
    sex: Sex;
}


export class Character {
    name: string;
    callName: string;
    nickName: string;
    talent: Talent;
}