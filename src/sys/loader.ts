import "babel-polyfill";
import {EraWebConsole} from "erats-console-web";
import {loadGame} from "../system/loadGame";
import {newGame} from "../system/newgame";
import {systemTitle} from "../system/title";
import {SystemFunctionType, YmContext} from "./base";
import {GameBase} from "./gameBase";
import {VariableData} from "./variable";

export function loadContext(gameBase: GameBase): YmContext {
    const inputBtn = document.getElementById("era-input-btn");
    const inputElem = document.getElementById("era-input") as HTMLInputElement;

    const console = new EraWebConsole(
        document.getElementById("era-console"),
        inputElem,
        (c) => {
            inputBtn.style.color = c;
            inputElem.style.color = c;
        },
        (c) => {
            document.documentElement.style.backgroundColor = c;
        });

    return new YmContext(console, new VariableData(gameBase), new Map([
        [SystemFunctionType.Title, systemTitle],
        [SystemFunctionType.Load, loadGame],
        [SystemFunctionType.First, newGame],
    ]));

}
