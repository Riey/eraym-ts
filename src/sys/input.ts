import {EraContext, InputRequest, InputResponse} from "erats";
import {printWithColorOnceCond} from "./print";

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
    color: string | null;
    enabled: boolean;

    constructor(text: string, value?: InputResponse, color?: string, enabled?: boolean) {
        this.text = text;
        this.value = value || parseInput(text);
        this.color = color || null;
        this.enabled = enabled || true;
    }

    printTo(ctx: EraContext) {
        printWithColorOnceCond(ctx, this.text, this.color, this.color !== null, true, this.value);
    }
}

export type FailedAction = (ctx: EraContext, fail: InputResponse) => boolean;

export function failMessage(msg: string): FailedAction {
    return (ctx, fail) => {
        ctx.console.printLine(msg);
        return false;
    };
}

export type ExitPred = (ctx: EraContext, startTime: number) => boolean;

export function exitNever(): ExitPred {
    return () => false;
}

export async function getValidInput(ctx: EraContext, req: InputRequest, failedAction: FailedAction, exitPred: ExitPred, buttons: Array<ButtonText>): Promise<InputResponse | null> {
    const startTime = Date.now();

    buttons.forEach(btn => {
        btn.printTo(ctx);
    });

    while (!exitPred(ctx, startTime)) {
        const input = await ctx.console.wait(req);

        for (let btn of buttons) {
            if (btn.enabled && btn.value === input) {
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
                value?: InputResponse, color?: string, enabled?: boolean) {
        super(text, value, color, enabled);

        this.func = func;
    }
}


export async function matchInput(ctx: EraContext, req: InputRequest, failedAction: FailedAction, exitPred: ExitPred, matches: Array<InputMatch>): Promise<boolean> {
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
