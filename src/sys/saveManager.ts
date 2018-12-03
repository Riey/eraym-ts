import saveAs from 'file-saver'
import {YmContext} from "./base";
import {VariableData} from "./variable";

export interface SaveManager {
    backup();
    restore();
    save(varData: VariableData, no: number);
    load(no: number): VariableData | null;
    has_sav(no: number): boolean;
}

export class WebSaveManager implements SaveManager {

    savs: Map<number, VariableData>;

    constructor() {
        this.savs = JSON.parse(window.localStorage.getItem("sav"))

        if (!(this.savs instanceof Map)) {
            this.savs = new Map<number, VariableData>();
            window.localStorage.setItem("sav", JSON.stringify(this.savs));
        }
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

    load(no: number): VariableData | null {
        const dat = this.savs[no];

        if (dat === undefined) {
            return null;
        } else {
            return dat;
        }
    }

    save(varData: VariableData, no: number) {
        this.savs[no] = varData;
        window.localStorage.setItem("sav", JSON.stringify(this.savs));
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

}
