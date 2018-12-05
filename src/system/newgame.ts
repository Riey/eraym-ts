import {Anata} from "../characters/anata";
import {YmContext} from "../sys/base";
import {Sex} from "../sys/character";
import {exitNever, failDoNothing, failMessage, InputMatch, matchInput} from "../sys/input";
import {reqAnyKey, reqInt} from "../sys/inputReq";
import {Difficulty, GameMode} from "../sys/variable";

export async function setMasterSex(ctx: YmContext) {
    ctx.console.printLine("너의 성별은?");

    const sex = await matchInput(ctx, reqInt(), failDoNothing(), exitNever(), [
        new InputMatch("[0] ♂", Sex.Male),
        new InputMatch("[1] ♀", Sex.Female),
        new InputMatch("[2] 후타나리", Sex.Futa, null, ctx.varData.getMaster().talent.forbiddenKnowledge ? "gray" : undefined),
    ]);

    ctx.varData.getMaster().setSex(sex);

    // TODO: 체형, 성벽, 경험, 가슴크기 선택
    throw new Error("not implemented!");
}

export async function startCharaSelect(ctx: YmContext) {
    throw new Error("not implemented!");
}

async function printGameModeHelp(ctx: YmContext) {
    ctx.console.drawLine();
    ctx.console.printLine(" eratohoYM ：보통 플레이를 할 사람 지향. 기한 있음");
    ctx.console.printLine(" PROSTITUTE：창관을 운영해나가는 모드입니다. 기한 있음");
    ctx.console.printLine(" ABNORMAL　：여주인이나 쇼타로 해보고 싶은 사람 지향. 기한 있음");
    ctx.console.printLine(" EXTRA 　　：백합과 장미의 세계로 어서 오십시오. 기한 없음");
    ctx.console.drawLine();
    await ctx.console.wait(reqAnyKey());
    ctx.console.drawLine();
    ctx.console.drawLine();
    ctx.console.drawLine();
}

export async function selectGameMode(ctx: YmContext) {
    ctx.console.drawLine();
    ctx.console.printLine("★★ 모드를 선택해 주세요 ★★");
    ctx.console.printLine("");
    ctx.console.drawLine();

    while (true) {
        const input = await matchInput(ctx, reqInt(), failMessage("다시 입력해주세요."), exitNever(), [
            new InputMatch("[0] eratohoYM", GameMode.Ym),
            new InputMatch("[1] ABNORMAL", GameMode.AbNormal),
            new InputMatch("[6] PROSTITUTE", GameMode.Prostitute),
            new InputMatch("[9] EXTRA", GameMode.Extra),
            new InputMatch("[100] HELP   (각 게임 모드의 간단한 설명)", 100),
        ]);

        if (input === 100) {
            await printGameModeHelp(ctx);
        } else {
            ctx.varData.flag.gameMode = input;

            switch (ctx.varData.flag.gameMode) {
                case GameMode.Ym: {
                    break;
                }
                case GameMode.AbNormal: {
                    const fn = await matchInput(ctx, reqInt(), failDoNothing(), exitNever(), [
                        new InputMatch("[0] 「당신」으로 시작한다", setMasterSex),
                        new InputMatch("[1] 동방 프로젝트 캐릭터 중에 선택한다", startCharaSelect),
                    ]);

                    await fn(ctx);
                    break;
                }
                default: {
                    throw new Error("not implemented!");
                }
            }

            break;
        }

    }
}

export async function selectDifficulty(ctx: YmContext) {
    ctx.console.drawLine();
    ctx.console.printLine("★★ 난이도를 선택하세요 ★★");
    ctx.console.newLine();
    ctx.console.drawLine();

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
        capacity: 10,
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
        // TODO: 조합지식과 매혹 습득
    }

    throw new Error("not implemented!");
}
