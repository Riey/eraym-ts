import {EraContext, InputRequest, InputResponse} from "erats";
import {printWithColorOnce, printWithColorOnceCond} from "./print";

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
    color: string | undefined;
    disabledColor: string | undefined;

    constructor(text: string, value?: InputResponse, color?: string, disabledColor?: string | null) {
        this.text = text;
        this.value = value || parseInput(text);
        this.color = color;

        if (disabledColor === null) {
            disabledColor = "gray";
        }

        this.disabledColor = disabledColor;
    }

    printTo(ctx: EraContext) {
        if (this.disabledColor !== undefined) {
            printWithColorOnce(ctx, this.text, this.disabledColor, true, this.value);
        } else {
            printWithColorOnceCond(ctx, this.text, this.color, this.color !== undefined, true, this.value);
        }
    }
}

export type FailedAction = (ctx: EraContext, fail: InputResponse) => boolean;

export function failMessage(msg: string): FailedAction {
    return (ctx, fail) => {
        ctx.console.printLine(msg);
        return false;
    };
}

export function failDoNothing(): FailedAction {
    return () => false;
}

export type ExitPred = (ctx: EraContext, startTime: number) => boolean;

export function exitNever(): ExitPred {
    return () => false;
}

export async function getValidInput(ctx: EraContext, req: InputRequest, failedAction: FailedAction, exitPred: ExitPred, buttons: ButtonText[]): Promise<InputResponse> {
    const startTime = Date.now();

    buttons.forEach((btn) => {
        btn.printTo(ctx);
    });

    while (!exitPred(ctx, startTime)) {
        const input = await ctx.console.wait(req);

        for (const btn of buttons) {
            if (btn.disabledColor === undefined && btn.value === input) {
                return input;
            }
        }

        if (failedAction(ctx, input)) {
            return input;
        }

    }

    throw new Error("input exited");
}

export class InputMatch<T> extends ButtonText {
    matchValue: T;

    constructor(text: string, matchValue: T,
                value?: InputResponse, color?: string, disabled_color?: string) {
        super(text, value, color, disabled_color);

        this.matchValue = matchValue;
    }
}

export async function matchInput<T>(ctx: EraContext, req: InputRequest, failedAction: FailedAction, exitPred: ExitPred, matches: Array<InputMatch<T>>): Promise<T> {
    const input = await getValidInput(ctx, req, failedAction, exitPred, matches);

    for (const match of matches) {
        if (match.value === input) {
            return match.matchValue;
        }
    }

    throw new Error("not found matched value");
}
