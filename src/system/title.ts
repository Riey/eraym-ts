import {ConsoleLineAlignment} from "erats";
import {SystemFunctionType, YmContext} from "../sys/base";
import {ButtonText, exitNever, failMessage, getValidInput} from "../sys/input";
import {reqInt} from "../sys/inputReq";

export async function systemTitle(ctx: YmContext) {
    ctx.console.setLineAlignment(ConsoleLineAlignment.Center);
    ctx.console.printLine(`${ctx.varData.gameBase.title}`);
    ctx.console.printLine(`v${ctx.varData.gameBase.version / 1000}`);
    ctx.console.printLine(`통합자: ${ctx.varData.gameBase.author}`);
    ctx.console.printLine(`(${ctx.varData.gameBase.year})`);
    ctx.console.printLine(``);
    ctx.console.printLine(`${ctx.varData.gameBase.info}`);
    ctx.console.printLine("「노예를 괴롭혀주세요…… 노예를 아껴주세요」");

    ctx.console.setLineAlignment(ConsoleLineAlignment.Left);
    ctx.console.drawLine();

    const input = await getValidInput(
        ctx,
        reqInt(),
        failMessage("잘못된 입력입니다"),
        exitNever(),
        [
            new ButtonText("[0] 힘세고 강한 시작"),
            new ButtonText("[1] 불러오기"),
        ],
    );

    if (input === 1) {
        ctx.begin(SystemFunctionType.Load);
    } else {
        ctx.begin(SystemFunctionType.First);
    }
}
