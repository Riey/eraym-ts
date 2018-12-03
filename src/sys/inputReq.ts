import {InputRequest, InputRequestType} from "erats";

export function reqInt(): InputRequest {
    return {
        type: InputRequestType.Int,
        data: null,
        expire: null,
    };
}
