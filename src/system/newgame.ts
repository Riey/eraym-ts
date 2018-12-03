import {YmContext} from "../sys/base";
import {Difficulty, GameMode} from "../sys/variable";
import {Anata} from "../characters/anata";

export async function selectGameMode(ctx: YmContext) {

}

export async function selectDifficulty(ctx: YmContext) {

}

export async function newGame(ctx: YmContext) {
    ctx.varData.characters = [new Anata()];

    ctx.varData.day = {
        week: 1,
        current: 1,
        end: -1,
    };

    ctx.varData.day.current = 1;
    ctx.varData.date = new Date(Date.UTC(1, 1, 1));
    ctx.varData.target = null;
    ctx.varData.assi = null;

    ctx.varData.money = {
        current: 5000,
        goal: 1000000,
    };

    ctx.varData.house = {
        capacity: 10
    };

    ctx.varData.flag = {
        difficulty: Difficulty.Easy,
        gameMode: GameMode.Ym,
    };

    await selectGameMode(ctx);
    await selectDifficulty(ctx);

    if (ctx.varData.flag.difficulty === Difficulty.Easy) {
        ctx.varData.getMaster().abl.technique = 3;
        ctx.varData.item.videoCamera = true;
        ctx.varData.item.videoTape = 1;
        //TODO: 조합지식과 매혹 습득
    }


}