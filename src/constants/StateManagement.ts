export enum ETokenStateActionType {
    UPDATE_TOKEN,
    REMOVE_TOKEN,
}

export enum ETokenType {
    CLIENT,
    ADMIN,
}

export interface ITokenType {
    data: Map<ETokenType, String>;
}

interface IPayloadType {
    tokenType: ETokenType;
    token: string;
}

export interface IAction {
    type: ETokenStateActionType;
    payload: IPayloadType;
}

export interface IGlobalStateType {
    tokens: ITokenType;
}
