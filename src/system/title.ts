import {YmContext} from "../sys/base";
import {ConsoleLineAlignment, InputRequestType} from "erats";
import {matchInput, MessageWhenFail} from "../sys/input";
import {newGame} from "./newgame";
import {loadGame} from "./loadGame";

export async function systemTitle(ctx: YmContext) {

    ctx.console.setLineAlignment(ConsoleLineAlignment.Center);
    ctx.console.printLine(`${ctx.varData.gameBase.title}`);
    ctx.console.printLine(`v${ctx.varData.gameBase.version / 1000}`);
    ctx.console.printLine(`통합자: ${ctx.varData.gameBase.author}`);
    ctx.console.printLine(`(${ctx.varData.gameBase.year})`);
    ctx.console.printLine(``);
    ctx.console.printLine(`${ctx.varData.gameBase.info}`);
    ctx.console.printLine('「노예를 괴롭혀주세요…… 노예를 아껴주세요」');

    ctx.console.setLineAlignment(ConsoleLineAlignment.Left);
    ctx.console.drawLine();

    await matchInput(
        ctx,
        {
            type: InputRequestType.Int,
            expire: null,
            data: null,
        },
        new MessageWhenFail("잘못된 입력입니다"),
        [
            {
                text: "[0] 힘세고 강한 시작",
                value: 0,
                func: newGame,
            },
            {
                text: "[1] 불러오기",
                value: 1,
                func: loadGame,
            }
        ]
    );
}
