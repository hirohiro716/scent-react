import { forwardRef, InputHTMLAttributes, ReactElement, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import { StringObject, Zipcode } from "scent-typescript";

type ZipcodeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    addressInputRef: React.RefObject<HTMLInputElement | null>,
}

/**
 * 郵便番号inputのコンポーネント。
 * 
 * @param addressInputRef 住所inputのref。
 * @param props 
 * @returns 
 */
const ZipcodeInput = forwardRef<HTMLInputElement, ZipcodeInputProps>(({addressInputRef, ...props}: ZipcodeInputProps, ref): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => {
        return inputRef.current!;
    });
    const [invalidZipcode, setInvalidZipcode] = useState<string | null>(null);
    const [previousAddress, setPreviousAddress] = useState<string | null>(null);
    const blurEventHandler = async () => {
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
            setPreviousAddress(address);
        } catch (error: any) {
            if (error.message.includes("No address matches") && zipcode.equals(invalidZipcode) === false) {
                alert("郵便番号に該当する住所が見つかりませんでした。");
                setInvalidZipcode(zipcode.toString());
                zipcodeInput.focus();
            }
        }
    }
    return (
        <input type="tel" inputMode="tel" autoComplete="tel-extension" maxLength={7} onBlur={blurEventHandler} ref={inputRef} {...props} />
    );
});
ZipcodeInput.displayName = "ZipcodeInput";
export default ZipcodeInput;
