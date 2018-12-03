import {EraContext, InputResponse} from "erats";

function printInternal(ctx: EraContext, text: string, newLine: boolean, value?: InputResponse) {
    if (value !== undefined) {
        ctx.console.printBtn(text, value);
    } else {
        ctx.console.print(text);
    }
    if (newLine) {
        ctx.console.newLine();
    }
}

export function printWithColorOnce(ctx: EraContext, text: string, color: string, newLine: boolean, value?: InputResponse) {
    const prevColor = ctx.console.getColor();
    ctx.console.setColor(color);
    printInternal(ctx, text, newLine, value);
    ctx.console.setColor(prevColor);
}

export function printWithColorOnceCond(ctx: EraContext, text: string, color: string, cond: boolean, newLine: boolean, value?: InputResponse) {
    if (cond) {
        printWithColorOnce(ctx, text, color, newLine, value);
    } else {
        printInternal(ctx, text, newLine, value);
    }
}