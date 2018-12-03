import {ConsoleLineAlignment} from "erats";
import {YmContext} from "./base";
import {ButtonText, FailedAction, getValidInput} from "./input";
import {reqInt} from "./inputReq";
import {printWithColorOnceCond} from "./print";

export enum PageMethod {
    Prev,
    Next,
    Exit,
}

export interface PageHandler {
    print(ctx: YmContext, current: number, min: number, max: number);
    check(input: number): PageMethod | null;
}

export class SimplePageHandler implements PageHandler {

    private readonly _prevNo: number;
    private readonly _nextNo: number;
    private readonly _quitNo: number;

    constructor(prevNo: number, nextNo: number, quitNo: number) {
        this._prevNo = prevNo;
        this._nextNo = nextNo;
        this._quitNo = quitNo;
    }

    print(ctx: YmContext, current: number, min: number, max: number) {
        ctx.console.setLineAlignment(ConsoleLineAlignment.Center);

        ctx.console.drawLine();
        ctx.console.printLine(`page ${current}/${max}`);
        ctx.console.drawLine();
        printWithColorOnceCond(ctx, `[${this._prevNo}] 이전 페이지`, "gray", current < min, false, this._prevNo);
        ctx.console.printBtn( `[${this._quitNo}] 나가기`, this._quitNo);
        printWithColorOnceCond(ctx, `[${this._nextNo}] 다음 페이지`, "gray", current >= max, false, this._nextNo);
        ctx.console.newLine();
        ctx.console.drawLine();

        ctx.console.setLineAlignment(ConsoleLineAlignment.Left);

    }

    check(input: number): PageMethod | null {
        switch (input) {
            case this._prevNo: return PageMethod.Prev;
            case this._nextNo: return PageMethod.Next;
            case this._quitNo: return PageMethod.Exit;
            default: return null;
        }
    }
}

const DEFAULT_PAGE_HANDLER = new SimplePageHandler(9999, 10000, 10001);
const DEFAULT_PAGE_SIZE = 20;

export async function getValidInputPage(ctx: YmContext, start: number, min: number, max: number, btnFactory: (number) => ButtonText, failedAction: FailedAction, pageHandler?: PageHandler, pageSize?: number): Promise<number | null> {

    pageHandler = pageHandler || DEFAULT_PAGE_HANDLER;

    let pageNo = start;
    pageSize = pageSize || DEFAULT_PAGE_SIZE;

    while (true) {
        const from = pageNo * pageSize;
        const to = from + pageSize;

        for (let i = from; i < to; i++) {
            const btn = btnFactory(i);
            btn.printTo(ctx);
        }

        pageHandler.print(ctx, pageNo, min, max);

        const input = await ctx.console.wait(reqInt()) as number;

        const method = pageHandler.check(input);

        if (method !== null) {
            switch (method) {
                case PageMethod.Prev:
                    if (input > min) {
                        pageNo -= 1;
                    }
                    break;
                case PageMethod.Next:
                    if (pageNo < max) {
                        pageNo += 1;
                    }
                    break;
                case PageMethod.Exit:
                    return null;
            }
        } else if (input < from || input >= to) {
            if (failedAction(ctx, input)) {
                return null;
            }
        } else {
            return input;
        }
    }
}
