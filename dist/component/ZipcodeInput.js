import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import { StringObject, Zipcode } from "scent-typescript";
/**
 * 郵便番号inputのコンポーネント。
 *
 * @param addressInputRef 住所inputのref。
 * @param props
 * @returns
 */
const ZipcodeInput = forwardRef(({ addressInputRef, ...props }, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => {
        return inputRef.current;
    });
    const [invalidZipcode, setInvalidZipcode] = useState(null);
    const [previousAddress, setPreviousAddress] = useState(null);
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
        }
        catch (error) {
            if (error.message.includes("No address matches") && zipcode.equals(invalidZipcode) === false) {
                alert("郵便番号に該当する住所が見つかりませんでした。");
                setInvalidZipcode(zipcode.toString());
                zipcodeInput.focus();
            }
        }
    };
    return (React.createElement("input", { type: "tel", inputMode: "tel", autoComplete: "tel-extension", maxLength: 8, onBlur: blurEventHandler, ref: inputRef, ...props }));
});
ZipcodeInput.displayName = "ZipcodeInput";
export default ZipcodeInput;
