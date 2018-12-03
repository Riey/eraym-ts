import {SystemFunctionType, YmContext} from "../sys/base";
import {getValidInputPage} from "../sys/inputPage";
import {ButtonText, failMessage} from "../sys/input";
import {SAVE_MANAGER} from "../sys/env";

import {VariableData} from "../sys/variable";
import leftPad = require("left-pad");

function makeSaveButton(no: number): ButtonText {
    if (SAVE_MANAGER.has_sav(no)) {
        const info = SAVE_MANAGER.load(no) as VariableData;
        return new ButtonText(`[${leftPad(no, 3, 0)}] ${info.saveInfo.date.toLocaleString()} ${info.saveInfo.description}`, no, null, true);
    } else {
        return new ButtonText(`[${leftPad(no, 3, 0)}] NO_DATA`, no, "gray", false);
    }
}

export async function loadGame(ctx: YmContext) {
    const saveNo = await getValidInputPage(ctx, 0, 0, 99, makeSaveButton, failMessage("잘못된 입력값입니다."));

    ctx.begin(SystemFunctionType.Title);

    if (saveNo !== null) {
        const saveDat = SAVE_MANAGER.load(saveNo);

        if (saveDat !== null) {
            ctx.varData = saveDat;
            ctx.begin(SystemFunctionType.Shop);
        }
    }
}
