import { forwardRef, InputHTMLAttributes, ReactElement, ReactEventHandler, useEffect, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import { StringObject, Zipcode } from "scent-typescript";

type ZipcodeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    addressInputRef: React.RefObject<HTMLInputElement | null>,
    callbackAfterZipcodeToAddress?: (address: string) => Promise<void>,
}

/**
 * 郵便番号inputのコンポーネント。
 * 
 * @param addressInputRef 住所inputのref。
 * @param props 
 * @returns 
 */
const ZipcodeInput = forwardRef<HTMLInputElement, ZipcodeInputProps>(({addressInputRef, callbackAfterZipcodeToAddress, onChange, onBlur, ...props}: ZipcodeInputProps, ref): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => {
        return inputRef.current!;
    });
    const [invalidZipcode, setInvalidZipcode] = useState<string | null>(null);
    const [previousAddress, setPreviousAddress] = useState<string | null>(null);
    const changeEventHandler: ReactEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const value = new StringObject();
        for (const one of StringObject.from(input.value)) {
            one.narrow();
            if (one.toString().match("[0-9\\-]")) {
                value.append(one);
                continue;
            }
        }
        const selectionStart = (input.selectionStart ? input.selectionStart : 0) - input.value.length + value.length();
        const selectionEnd = (input.selectionEnd ? input.selectionEnd : 0) - input.value.length + value.length();
        input.value = value.toString();
        if (selectionStart >= 0 && selectionEnd >= 0) {
            input.selectionStart = selectionStart;
            input.selectionEnd = selectionEnd;
        }
        if (onChange) {
            onChange(event);
        }
    }
    const blurEventHandler: ReactEventHandler<HTMLInputElement> = async (event: React.FocusEvent<HTMLInputElement>) => {
        const zipcodeInput = inputRef.current;
        const addressInput = addressInputRef.current;
        if (zipcodeInput === null || addressInput === null) {
            return;
        }
        if (StringObject.from(zipcodeInput.value).length() < 7) {
            return;
        }
        if (StringObject.from(addressInput.value).length() > 0 && StringObject.from(addressInput.value).equals(previousAddress) === false) {
            return;
        }
        const zipcode = new StringObject(zipcodeInput.value);
        try {
            const result = await Zipcode.fetchAddress(zipcode.toString());
            const address = StringObject.join([result.prefecture, result.address]).toString();
            addressInput.value = address;
            addressInput.setSelectionRange(address.length, address.length);
            if (callbackAfterZipcodeToAddress) {
                await callbackAfterZipcodeToAddress(address);
            }
            setPreviousAddress(address);
        } catch (error: any) {
            if (error.message.includes("No address matches") && zipcode.equals(invalidZipcode) === false) {
                alert("郵便番号に該当する住所が見つかりませんでした。");
                setInvalidZipcode(zipcode.toString());
                zipcodeInput.focus();
            }
        }
        if (onBlur) {
            onBlur(event);
        }
    }
    useEffect(() => {
        const zipcodeInput = inputRef.current;
        if (zipcodeInput === null) {
            return;
        }
    }, []);
    return (
        <input type="tel" inputMode="tel" autoComplete="tel-extension" maxLength={8} onChange={changeEventHandler} onBlur={blurEventHandler} ref={inputRef} {...props} />
    );
});
ZipcodeInput.displayName = "ZipcodeInput";
export default ZipcodeInput;
