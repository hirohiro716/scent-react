import React, { CSSProperties, InputHTMLAttributes, KeyboardEvent, MouseEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StringObject, UserAgent } from "scent-typescript";

type AutocompleteInputProps = InputHTMLAttributes<HTMLInputElement> & {
    items: any[],
    displayTextMaker?: (item: any) => string,
    keywordMaker?: (item: any) => string,
    callbackAfterAutocomplete?: (item: any) => void,
}

/**
 * オートコンプリート機能付きのinputコンポーネント。
 * 
 * @param props 
 * @returns 
 */
const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(({items, displayTextMaker, keywordMaker, callbackAfterAutocomplete, ...props}: AutocompleteInputProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => {
        return inputRef.current!;
    });
    // Items
    const [ mapItemAndDisplayText ] = useState<Map<string, any>>(new Map());
    const [ nonDuplicatedItems ] = useState<any[]>(() => {
        const newItems: any[] = [];
        items.forEach((item) => {
            const displayText = StringObject.from(displayTextMaker ? displayTextMaker(item) : item).toString();
            if (displayText.length > 0 && mapItemAndDisplayText.has(displayText) === false) {
                newItems.push(item);
                mapItemAndDisplayText.set(displayText, item);
            }
        });
        return newItems;
    });
    // Div
    const [ divShowing, setDivShowing ] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const divStyle: CSSProperties = { position: "fixed", overflowY: "scroll", display: "none" };
    divStyle.border = "1px solid #ccc";
    divStyle.borderRadius = "0.3em";
    divStyle.backgroundColor = "#fff";
    divStyle.padding = "0.5em";
    divStyle.boxShadow = "0.2em 0 0.5em 0 rgba(0, 0, 0, 0.2)";
    const updateDiv = () => {
        if (typeof window === "undefined" || window.visualViewport === null || divRef.current === null || inputRef.current === null) {
            return;
        }
        if (divShowing) {
            divRef.current.style.display = "";
        } else {
            divRef.current.style.display = "none";
        }
    }
    if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {
            updateDiv();
        });
    }
    useEffect(() => {
        updateDiv();
    }, [divShowing]);
    const setDivVisible = (visible: boolean) => {
        if (filteredItemDisplayTexts.length > 0) {
            setDivShowing(visible);
        } else {
            setDivShowing(false);
        }
    }
    useEffect(() => {
        if (typeof window === "undefined" || window.visualViewport === null || divRef.current === null || inputRef.current === null) {
            return;
        }
        divRef.current.style.position = "sticky";
        divRef.current.style.height = "9em";
        const inputRect = inputRef.current.getBoundingClientRect();
        if (inputRect.top < window.visualViewport.height / 2) {
            inputRef.current.parentElement?.insertBefore(inputRef.current, divRef.current);
            divRef.current.style.marginTop = "0.3em";
            divRef.current.style.marginBottom = "-9em";
        } else {
            inputRef.current.parentElement?.insertBefore(divRef.current, inputRef.current);
            divRef.current.style.marginTop = "-9em";
            divRef.current.style.marginBottom = "0.3em";
        }
        divRef.current.style.width = inputRect.width + "px";
    }, []);
    // Autocomplete
    const autocomplete = (itemDisplayText: string) => {
        setDivVisible(false);
        if (inputRef.current && StringObject.from(itemDisplayText).equals(inputRef.current.value) === false) {
            inputRef.current.value = itemDisplayText;
            if (callbackAfterAutocomplete) {
                callbackAfterAutocomplete(mapItemAndDisplayText.get(itemDisplayText));
            }
        }
    }
    // Select item
    const [ selectedItemDisplayText, setSelectedItemDisplayText ] = useState<string>("");
    const itemStyle: CSSProperties = {};
    itemStyle.textIndent = "-0.5em";
    itemStyle.paddingLeft = "0.5em";
    itemStyle.cursor = "pointer";
    const selectedItemStyle: CSSProperties = {...itemStyle};
    selectedItemStyle.backgroundColor = "#ddd";
    const selectItem = (itemDisplayText: string) => {
        if (divRef.current === null) {
            return;
        }
        setSelectedItemDisplayText(itemDisplayText);
        const itemElements = divRef.current.querySelectorAll(StringObject.join(["li[data-text='", itemDisplayText, "']"]).toString());
        if (itemElements.length > 0) {
            const itemElement = itemElements[0];
            itemElement.scrollIntoView({ block: "nearest"});
        }
    }
    // Hover item
    const [ hoverItem, setHoverItem ] = useState<string>();
    const hoverItemStyle: CSSProperties = {...itemStyle};
    hoverItemStyle.backgroundColor = "#eee";
    const itemMouseEnterEventHandler = (e: MouseEvent) => {
        const value = e.currentTarget.getAttribute("data-text");
        if (value === null) {
            return;
        }
        setHoverItem(value);
    }
    const itemMouseLeaveEventHandler = (e: MouseEvent) => {
        setHoverItem(undefined);
    }
    // Item mouse events
    const [ mouseDownItemDisplayText, setMouseDownItemDisplayText ] = useState<string>();
    const itemMouseDownEventHandler = (e: MouseEvent) => {
        const value = e.currentTarget.getAttribute("data-text");
        if (value === null) {
            return;
        }
        setMouseDownItemDisplayText(value);
    }
    const itemMouseUpEventHandler = (e: MouseEvent) => {
        if (inputRef.current === null || e.button != 0 || typeof mouseDownItemDisplayText === "undefined") {
            return;
        }
        autocomplete(mouseDownItemDisplayText);
        setMouseDownItemDisplayText(undefined);
        setSelectedItemDisplayText(mouseDownItemDisplayText);
        inputRef.current.focus();
    }
    // Item filter
    const [ filteredItemDisplayTexts, setFilteredItemDisplayTexts ] = useState<string[]>(() => {
        return nonDuplicatedItems.map((item) => StringObject.from(displayTextMaker ? displayTextMaker(item) : item).toString());
    });
    const filterItems = () => {
        if (inputRef.current === null || divRef.current === null) {
            return;
        }
        const itemDisplayTexts:string[] = [];
        const inputValue = inputRef.current.value;
        for (const li of divRef.current.querySelectorAll("li")) {
            const keyword = new StringObject(li.dataset["keyword"]);
            const style = li.style;
            if (inputValue.length > 0 && keyword.clone().replace(inputValue, "").length() === keyword.length()) {
                style.display = "none";
            } else {
                style.display = "";
                itemDisplayTexts.push(li.dataset["text"]!);
            }
        }
        if (itemDisplayTexts.length > 0) {
            divRef.current.style.opacity = "1";
        } else {
            divRef.current.style.opacity = "0";
        }
        setFilteredItemDisplayTexts(itemDisplayTexts);
    }
    // Input click events
    const inputClickEventHandler = (e: MouseEvent) => {
        setDivVisible(!divShowing);
    }
    // Input key events
    const inputKeyDownEventHandler = (e: KeyboardEvent) => {
        if (divRef.current === null) {
            return;
        }
        switch (e.key) {
            case "ArrowUp":
                let upperIndex = filteredItemDisplayTexts.indexOf(selectedItemDisplayText);
                if (upperIndex <= 0) {
                    upperIndex = filteredItemDisplayTexts.length;
                }
                upperIndex -= 1;
                const upperItem = filteredItemDisplayTexts[upperIndex];
                selectItem(upperItem);
                setDivVisible(true);
                e.preventDefault();
                break;
            case "ArrowDown":
                let lowerIndex = filteredItemDisplayTexts.indexOf(selectedItemDisplayText);
                if (lowerIndex >= filteredItemDisplayTexts.length - 1) {
                    lowerIndex = -1;
                }
                lowerIndex += 1;
                const lowerItem = filteredItemDisplayTexts[lowerIndex];
                selectItem(lowerItem);
                setDivVisible(true);
                e.preventDefault();
                break;
            case "Enter":
                if (inputRef.current && selectedItemDisplayText) {
                    autocomplete(selectedItemDisplayText);
                }
                break;
            case "Escape":
                setDivVisible(false);
                break;
        }
    }
    // Create elements
    const keyPrefix = new StringObject(props.id);
    if (keyPrefix.length() === 0) {
        keyPrefix.append(props.name);
    }
    if (keyPrefix.length() === 0) {
        keyPrefix.append("idless_autocomplete_input");
    }
    const keyMaker = (index: number) :string => {
        return keyPrefix.clone().append("-").append(index).toString();
    }
    return (
        <>
            <input onChange={() => {setDivVisible(true); filterItems()}} onClick={inputClickEventHandler} onKeyDown={inputKeyDownEventHandler} onBlur={() => {if (typeof mouseDownItemDisplayText === "undefined") setDivVisible(false)}} ref={inputRef} {...props} />
            <div tabIndex={-1} style={divStyle} ref={divRef}>
                <ol>
                    {nonDuplicatedItems.map((item, index) => {
                        const displayText = StringObject.from(displayTextMaker ? displayTextMaker(item) : item).toString();
                        return (
                            <li 
                                data-text={displayText}
                                data-keyword={keywordMaker ? keywordMaker(item) : item}
                                style={StringObject.from(displayText).equals(hoverItem) ? hoverItemStyle : (StringObject.from(displayText).equals(selectedItemDisplayText) ? selectedItemStyle : itemStyle) }
                                onMouseEnter={itemMouseEnterEventHandler}
                                onMouseLeave={itemMouseLeaveEventHandler}
                                onMouseDown={itemMouseDownEventHandler}
                                onMouseUp={itemMouseUpEventHandler}
                                key={keyMaker(index)} tabIndex={-1}>
                                    {displayText}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </>
    );
});
export default AutocompleteInput;
