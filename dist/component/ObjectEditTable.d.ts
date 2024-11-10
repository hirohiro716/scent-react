import React, { ReactElement, ReactEventHandler } from "react";
import { Property } from "scent-typescript";
/**
 * オブジェクトを編集するテーブルコンポーネント。
 *
 * @param properties 列プロパティの配列。
 * @param identifierMaker 行のオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param objects 編集する行オブジェクトの配列。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。引数のクラス名とChangeEventHandlerを使用して要素を作成して返す必要がある。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param emptyMessage 表示する行オブジェクトがゼロ件の場合に表示するメッセージ。
 * @param props
 * @returns
 */
declare const ObjectEditTable: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    properties: Property[];
    identifierMaker?: (record: Record<string, any>) => string | null;
    objects: Record<string, any>[];
    elementMaker?: (className: string, changeEventHandler: ReactEventHandler<any>, object: Record<string, any>, property: Property, elementFinder: (object: Record<string, any>, property: Property) => HTMLElement | undefined) => ReactElement | undefined;
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    emptyMessage?: string;
} & React.RefAttributes<HTMLTableElement>>;
export default ObjectEditTable;
