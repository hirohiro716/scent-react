import React, { Dispatch, ReactElement, ReactEventHandler, SetStateAction } from "react";
import { Property } from "scent-typescript";
/**
 * オブジェクトを編集するテーブルコンポーネント。
 *
 * @param props
 * @returns
 */
declare const ObjectEditTable: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    properties: Property[];
    identifierMaker?: (record: Record<string, any>) => string | null;
    objects: Record<string, any>[];
    elementMaker?: (object: Record<string, any>, property: Property, onChangeEventHandler: ReactEventHandler<any>, dispatch: Dispatch<SetStateAction<string>>) => ReactElement | undefined;
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    emptyMessage?: string;
} & React.RefAttributes<HTMLTableElement>>;
export default ObjectEditTable;
