import React, { ReactElement, ReactEventHandler } from "react";
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
    elementMaker?: (object: Record<string, any>, property: Property, onChangeEventHandler: ReactEventHandler<any>) => ReactElement | undefined;
    objectValueGetter?: (property: Property, object: Record<string, any>) => string | undefined;
    elementValueGetter?: (property: Property, object: Record<string, any>, element: any) => any;
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    emptyMessage?: string;
} & React.RefAttributes<HTMLTableElement>>;
export default ObjectEditTable;
