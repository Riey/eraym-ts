import {InputRequest, InputResponse} from "erats";
import {YmContext} from "./base";

export interface ButtonText {
    text: string;
    value: InputResponse;
}

export interface FailedAction {
    fail(ctx: YmContext, fail: InputResponse);
}

export class MessageWhenFail implements FailedAction {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    fail(ctx: YmContext, fail: InputResponse) {
        ctx.console.printLine(this.message);
    }
}

export async function getValidInput<B extends ButtonText>(ctx: YmContext, req: InputRequest, failedAction: FailedAction, buttons: Array<B>): Promise<B> {
    buttons.forEach(btn => {
        ctx.console.printBtn(btn.text, btn.value);
        ctx.console.newLine();
    });

    while (true) {
        const input = await ctx.console.wait(req);

        for (let btn of buttons) {
            if (btn.value === input) {
                return btn;
            }
        }

        failedAction.fail(ctx, input);
    }
}

export interface InputMatch extends ButtonText {
    func: (YmContext, InputResponse) => Promise<void>;
}

export async function matchInput(ctx: YmContext, req: InputRequest, failedAction: FailedAction, matches: Array<InputMatch>): Promise<void> {
    const input = await getValidInput(ctx, req, failedAction, matches);
    await input.func(ctx, input.value);
}
