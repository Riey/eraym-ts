import saveAs from 'file-saver'
import {VariableData, YmContext} from "./base";

export interface SaveManager {
    backup();
    restore();
    save(ctx: YmContext, no: number);
    load(ctx: YmContext, no: number): boolean;
    has_sav(no: number): boolean;
}

export class WebSaveManager implements SaveManager {

    savs: Map<number, VariableData>;

    constructor() {
        this.savs = JSON.parse(window.localStorage.getItem("sav"))
    }

    backup() {
        const str = JSON.stringify(this.savs, null, 2);
        const blob = new Blob([str], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "eraym_sav.json");
    }

    has_sav(no: number): boolean {
        return this.savs.has(no);
    }

    load(ctx: YmContext, no: number): boolean {
        const variable = this.savs.get(no);

        if (variable === undefined) {
            return false;
        }

        ctx.varData = variable;
        return true;
    }

    restore() {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = false;
        input.readOnly = true;
        input.name = "eraym_sav.json";
        input.click();

        if (input.files.length < 1) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(input.files[0], "utf-8");

        const savs = fileReader.result as string;
        this.savs = JSON.parse(savs);
    }

    save(ctx: YmContext, no: number) {
        this.savs[no] = ctx.varData;
    }

}
