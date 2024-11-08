import React, { CSSProperties, Dispatch, ReactElement, ReactEventHandler, SetStateAction } from "react";
import { Property } from "scent-typescript";
/**
 * オブジェクト編集テーブルダイアログのコンポーネント。
 *
 * @param showing 表示する場合はtrueを指定する。
 * @param dispatch 表示と非表示を切り替えるためのDispatch。
 * @param message メッセージ。
 * @param properties 列プロパティの配列。
 * @param identifierMaker 行のオブジェクトから一意の値を作成するコールバック。未指定の場合は行番号が使用される。
 * @param objects 編集する行オブジェクトの配列。
 * @param elementMaker フィールドに表示する要素を作成するコールバック。引数のクラス名とChangeEventHandlerを使用して要素を作成して返す必要がある。
 * @param leftFunctionButtons データ列の左側に表示するボタンを作成するコールバック。
 * @param rightFunctionButtons データ列の右側に表示するボタンを作成するコールバック。
 * @param closeFunction ダイアログを閉じる際の処理。
 * @param width ダイアログの幅。
 * @param overlayBackgroundStyle 背景要素へ渡すスタイル。
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
    elementMaker?: (className: string, changeEventHandler: ReactEventHandler<any>, object: Record<string, any>, property: Property, elementFinder: () => HTMLElement | undefined) => ReactElement | undefined;
    leftFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    rightFunctionButtons?: Record<string, (object: Record<string, any>) => Promise<void> | void>;
    closeFunction?: () => Promise<void>;
    width: string;
    overlayBackgroundStyle?: CSSProperties;
} & React.RefAttributes<HTMLDivElement>>;
export default ObjectEditTableDialog;
