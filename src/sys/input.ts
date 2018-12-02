import {InputRequest, InputResponse} from "erats";
import {YmContext} from "./base";

function parseInput(text: string): InputResponse | null {
    const left = text.indexOf("[");

    if (left === -1) {
        return null;
    }

    const right = text.indexOf("]", left);

    if (right === -1) {
        return null;
    }

    const strValue = text.substring(left + 1, right);

    const intValue = parseInt(strValue, 10);

    if (isNaN(intValue)) {
        return strValue;
    } else {
        return intValue;
    }
}

export class ButtonText {
    text: string;
    value: InputResponse;
    color: (YmContext, boolean) => string | null;
    check: (YmContext) => boolean;

    constructor(text: string, value?: InputResponse, color?: (YmContext, boolean) => string | null, check?: (YmContext) => boolean) {
        this.text = text;
        this.value = value || parseInput(text);
        this.color = color || (() => null);
        this.check = check || (() => true);
    }
}

export type FailedAction = (ctx: YmContext, fail: InputResponse) => boolean;

export function failMessage(msg: string): FailedAction {
    return (ctx, fail) => {
        ctx.console.printLine(msg);
        return false;
    };
}

export type ExitPred = (ctx: YmContext, startTime: number) => boolean;

export function exitNever(): ExitPred {
    return () => false;
}

export async function getValidInput(ctx: YmContext, req: InputRequest, failedAction: FailedAction, exitPred: ExitPred, buttons: Array<ButtonText>): Promise<InputResponse | null> {
    const startTime = Date.now();
    const firstColor = ctx.console.getColor();

    buttons.forEach(btn => {
        const check = btn.check(ctx);
        const color = btn.color(ctx, check);

        if (color !== null) {
            ctx.console.setColor(color);
        }

        ctx.console.printBtn(btn.text, btn.value);
        ctx.console.newLine();

        if (color !== null) {
            ctx.console.setColor(firstColor);
        }
    });

    while (!exitPred(ctx, startTime)) {
        const input = await ctx.console.wait(req);

        for (let btn of buttons) {
            if (btn.check(ctx) && btn.value === input) {
                return input;
            }
        }

        if (failedAction(ctx, input)) {
            return input;
        }
    }
}

export class InputMatch extends ButtonText {
    func: (YmContext, InputResponse) => Promise<void>;

    constructor(text: string, func: (YmContext, InputResponse) => Promise<void>,
                value?: InputResponse, color?: (YmContext, boolean) => string | null, check?: (YmContext) => boolean) {
        super(text, value, color, check);

        this.func = func;
    }
}


export async function matchInput(ctx: YmContext, req: InputRequest, failedAction: FailedAction, exitPred: ExitPred, matches: Array<InputMatch>): Promise<boolean> {
    const input = await getValidInput(ctx, req, failedAction, exitPred, matches);

    if (input === null) {
        return false;
    }

    for (let match of matches) {
        if (match.value === input) {
            await match.func(ctx, input);
            return true;
        }
    }

    return false;
}
