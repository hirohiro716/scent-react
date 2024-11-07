import React, { CSSProperties, Dispatch, ReactElement, ReactEventHandler, SetStateAction } from "react";
import { Property } from "scent-typescript";
/**
 * オブジェクト編集テーブルダイアログのコンポーネント。
 *
 * @param props
 * @returns
 */
declare const ObjectEditTableDialog: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    showing: boolean | undefined;
    dispatch: Dispatch<SetStateAction<boolean>>;
    message: string | undefined;
    properties: Property[];
    identifierMaker?: (record: Record<string, any>) => string | null;
    objects: Record<string, any>[];
    elementMaker?: (value: string, dispatch: Dispatch<SetStateAction<string>>, onChangeEventHandler: ReactEventHandler<any>, object: Record<string, any>, property: Property) => ReactElement | undefined;
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    closeFunction?: () => Promise<void>;
    width: string;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default ObjectEditTableDialog;
