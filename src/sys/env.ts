import {SaveManager, WebSaveManager} from "./saveManager";

export enum EraEnv {
    Web,
    Unknown,
}

function getEnv(): EraEnv {
    if (window !== undefined) {
        return EraEnv.Web;
    }

    return EraEnv.Unknown;
}

function getSaveManager(): SaveManager {
    switch (ENV) {
        case EraEnv.Web:
            return new WebSaveManager();
        default:
            throw new Error("unimplemented!");
    }
}

export const ENV = getEnv();

export const SAVE_MANAGER = getSaveManager();
