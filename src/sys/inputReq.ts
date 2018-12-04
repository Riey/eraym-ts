import {InputRequest, InputRequestType} from "erats";

export function reqInt(): InputRequest {
    return {
        type: InputRequestType.Int,
        data: null,
        expire: null,
    };
}

export function reqAnyKey(): InputRequest {
    return {
        type: InputRequestType.AnyKey,
        data: null,
        expire: null,
    };
}
