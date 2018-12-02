import {ButtonText, FailedAction} from "./input";
import {YmContext} from "./base";

export enum PageMethod {
    Prev,
    Next,
    Exit,
}

export interface PageHandler {
    print(ctx: YmContext, current: number, min: number, max: number);
    check(input: number): PageMethod | null;
}

export async function getValidInputPage(start: number, end: number, btnFactory: (number) => ButtonText, failedAction: FailedAction, handler?: PageHandler) {
    const pageHandler = handler || {
        print(ctx: YmContext, current: number, min: number, max: number) {

        }
    }
}