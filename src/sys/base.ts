import {EraConsole, EraContext} from "erats";
import {systemTitle} from "../system/title";
import {VariableData} from "./variable";

export function saveSav(varData: VariableData): string {
    return JSON.stringify(varData);
}

export function loadSav(sav: string): VariableData {
    return JSON.parse(sav);
}

export type SystemFunction = (ctx: YmContext) => Promise<void>;

export class YmContext implements EraContext<VariableData> {
    beginType: SystemFunctionType | null;
    systemFunctions: Map<SystemFunctionType, SystemFunction>;
    console: EraConsole;
    varData: VariableData;

    constructor(console: EraConsole, varData: VariableData, systemFunctions: Map<SystemFunctionType, SystemFunction>) {
        this.console = console;
        this.varData = varData;
        this.beginType = null;
        this.systemFunctions = systemFunctions;
    }

    begin(type: SystemFunctionType) {
        this.beginType = type;
    }

    async start() {
        this.begin(SystemFunctionType.Title);

        while (this.beginType !== null) {

            const systemFunction = this.systemFunctions.get(this.beginType);

            if (systemFunction === undefined) {
                return;
            }

            this.beginType = null;

            await systemFunction(this);
        }
    }
}

export enum SystemFunctionType {
    Title,
    Load,
    First,
    Shop,
    Train,
    TrainEnd,
}
