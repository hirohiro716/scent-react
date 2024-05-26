import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StringObject } from "scent-typescript";
/**
 * オートコンプリート機能付きのinputコンポーネント。
 *
 * @param props
 * @returns
 */
const AutocompleteInput = forwardRef(({ items, displayTextMaker, keywordMaker, callbackAfterAutocomplete, ...props }, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => {
        return inputRef.current;
    });
    // Items
    const [mapItemAndDisplayText] = useState(new Map());
    const [nonDuplicatedItems] = useState(() => {
        const newItems = [];
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
    const [divShowing, setDivShowing] = useState(false);
    const divRef = useRef(null);
    const divStyle = { position: "fixed", overflowY: "scroll", display: "none" };
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
        }
        else {
            divRef.current.style.display = "none";
        }
    };
    if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {
            updateDiv();
        });
    }
    useEffect(() => {
        updateDiv();
    }, [divShowing]);
    const setDivVisible = (visible) => {
        if (filteredItemDisplayTexts.length > 0) {
            setDivShowing(visible);
        }
        else {
            setDivShowing(false);
        }
    };
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
        }
        else {
            inputRef.current.parentElement?.insertBefore(divRef.current, inputRef.current);
            divRef.current.style.marginTop = "-9em";
            divRef.current.style.marginBottom = "0.3em";
        }
        divRef.current.style.width = inputRect.width + "px";
    }, []);
    // Autocomplete
    const autocomplete = (itemDisplayText) => {
        setDivVisible(false);
        if (inputRef.current && StringObject.from(itemDisplayText).equals(inputRef.current.value) === false) {
            inputRef.current.value = itemDisplayText;
            if (callbackAfterAutocomplete) {
                callbackAfterAutocomplete(mapItemAndDisplayText.get(itemDisplayText));
            }
        }
    };
    // Select item
    const [selectedItemDisplayText, setSelectedItemDisplayText] = useState("");
    const itemStyle = {};
    itemStyle.textIndent = "-0.5em";
    itemStyle.paddingLeft = "0.5em";
    itemStyle.cursor = "pointer";
    const selectedItemStyle = { ...itemStyle };
    selectedItemStyle.backgroundColor = "#ddd";
    const selectItem = (itemDisplayText) => {
        if (divRef.current === null) {
            return;
        }
        setSelectedItemDisplayText(itemDisplayText);
        const itemElements = divRef.current.querySelectorAll(StringObject.join(["li[data-text='", itemDisplayText, "']"]).toString());
        if (itemElements.length > 0) {
            const itemElement = itemElements[0];
            itemElement.scrollIntoView({ block: "nearest" });
        }
    };
    // Hover item
    const [hoverItem, setHoverItem] = useState();
    const hoverItemStyle = { ...itemStyle };
    hoverItemStyle.backgroundColor = "#eee";
    const itemMouseEnterEventHandler = (e) => {
        const value = e.currentTarget.getAttribute("data-text");
        if (value === null) {
            return;
        }
        setHoverItem(value);
    };
    const itemMouseLeaveEventHandler = (e) => {
        setHoverItem(undefined);
    };
    // Item mouse events
    const [mouseDownItemDisplayText, setMouseDownItemDisplayText] = useState();
    const itemMouseDownEventHandler = (e) => {
        const value = e.currentTarget.getAttribute("data-text");
        if (value === null) {
            return;
        }
        setMouseDownItemDisplayText(value);
    };
    const itemMouseUpEventHandler = (e) => {
        if (inputRef.current === null || e.button != 0 || typeof mouseDownItemDisplayText === "undefined") {
            return;
        }
        autocomplete(mouseDownItemDisplayText);
        setMouseDownItemDisplayText(undefined);
        setSelectedItemDisplayText(mouseDownItemDisplayText);
        inputRef.current.focus();
    };
    // Item filter
    const [filteredItemDisplayTexts, setFilteredItemDisplayTexts] = useState(() => {
        return nonDuplicatedItems.map((item) => StringObject.from(displayTextMaker ? displayTextMaker(item) : item).toString());
    });
    const filterItems = () => {
        if (inputRef.current === null || divRef.current === null) {
            return;
        }
        const itemDisplayTexts = [];
        const inputValue = inputRef.current.value;
        for (const li of divRef.current.querySelectorAll("li")) {
            const keyword = new StringObject(li.dataset["keyword"]);
            const style = li.style;
            if (inputValue.length > 0 && keyword.clone().replace(inputValue, "").length() === keyword.length()) {
                style.display = "none";
            }
            else {
                style.display = "";
                itemDisplayTexts.push(li.dataset["text"]);
            }
        }
        if (itemDisplayTexts.length > 0) {
            divRef.current.style.opacity = "1";
        }
        else {
            divRef.current.style.opacity = "0";
        }
        setFilteredItemDisplayTexts(itemDisplayTexts);
    };
    // Input click events
    const inputClickEventHandler = (e) => {
        setDivVisible(!divShowing);
    };
    // Input key events
    const inputKeyDownEventHandler = (e) => {
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
    };
    // Create elements
    const keyPrefix = new StringObject(props.id);
    if (keyPrefix.length() === 0) {
        keyPrefix.append(props.name);
    }
    if (keyPrefix.length() === 0) {
        keyPrefix.append("idless_autocomplete_input");
    }
    const keyMaker = (index) => {
        return keyPrefix.clone().append("-").append(index).toString();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { onChange: () => { setDivVisible(true); filterItems(); }, onClick: inputClickEventHandler, onKeyDown: inputKeyDownEventHandler, onBlur: () => { if (typeof mouseDownItemDisplayText === "undefined")
                setDivVisible(false); }, ref: inputRef, ...props }),
        React.createElement("div", { tabIndex: -1, style: divStyle, ref: divRef },
            React.createElement("ol", null, nonDuplicatedItems.map((item, index) => {
                const displayText = StringObject.from(displayTextMaker ? displayTextMaker(item) : item).toString();
                return (React.createElement("li", { "data-text": displayText, "data-keyword": keywordMaker ? keywordMaker(item) : item, style: StringObject.from(displayText).equals(hoverItem) ? hoverItemStyle : (StringObject.from(displayText).equals(selectedItemDisplayText) ? selectedItemStyle : itemStyle), onMouseEnter: itemMouseEnterEventHandler, onMouseLeave: itemMouseLeaveEventHandler, onMouseDown: itemMouseDownEventHandler, onMouseUp: itemMouseUpEventHandler, key: keyMaker(index), tabIndex: -1 }, displayText));
            })))));
});
export default AutocompleteInput;
