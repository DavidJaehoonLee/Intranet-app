﻿import Message from "./message.js"

export default class FormControl extends Message {
    #decimals = 0;
    #numberMask = false;
    #value = "";
    #emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor(id, decimals = 0, maxLength = 0) {
        super(document.getElementById(id).parentNode);
        this.elem = document.getElementById(id);
        this.#decimals = decimals;
        if (this.elem.nodeName === "INPUT" && this.elem.getAttribute("inputmode") === "numeric") {
            this.#numberMask = true;
            if (maxLength > 0) this.elem.maxLength = maxLength;
            this.elem.onfocus = this.#focusEvent;
            this.elem.onblur = this.#blurEvent;
            this.elem.onkeydown = this.#keyEvent;
        }
    }

    #focusEvent = (e) => {
        e.target.value = this.#value;
    }

    #blurEvent = (e) => {
        this.#value = e.target.value.replace(/,/g, "");
        if (this.#value !== "")
            this.#setFormatNumberValue();
    }

    #keyEvent = (e) => {
        if ((this.#decimals == 0 || e.target.value.includes(".")) && (e.keyCode == 190 || e.keyCode == 110)) {
            e.preventDefault();
            return;
        }

        if (![8, 9, 37, 39, 110, 190].includes(e.keyCode) &&
            (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105)) {
            e.preventDefault();
            return;
        }

        if (e.keyCode != 8) {
            let number = e.target.value.split('.');
            let dotPos = e.target.value.indexOf('.');
            if (dotPos > -1 && number[1].length >= this.#decimals) {
                e.preventDefault();
                return;
            }
        }
    }

    #setFormatNumberValue() {
        let options = { minimumFractionDigits: this.#decimals, maximumFractionDigits: this.#decimals };
        let val = this.elem.value.replace(/,/g, "");
        this.elem.value = new Intl.NumberFormat('en-EN', options).format(val);
    }

    set onBlur(fn) {
        this.elem.onblur = (e) => {
            if (this.#numberMask)
                this.#blurEvent(e);
            fn(e);
        }
    }

    set onFocus(fn) {
        this.elem.onfocus = (e) => {
            if (this.#numberMask)
                this.#focusEvent(e);
            fn(e);
        }
    }

    get value() {
        return this.#numberMask ? this.#value : this.elem.value;
    }

    set value(value) {
        this.elem.value = value;
        if (this.#numberMask) {
            this.#value = value;
            this.#setFormatNumberValue();
        }
    }

    set decimals(val) {
        this.#decimals = val;
    }

    get isValidEmail() {
        return this.#emailPattern.test(this.elem.value);
    }

    get areValidEmails() {
        const emails = this.elem.value.trim().split(/,|;/);
        for (const email of emails) {
            if (!this.#emailPattern.test(email.trim())) {
                return false;
            }
        }
        return true;
    }

    get isEmpty() {
        return this.elem.value.trim() === "";
    }

    get selectedText() {
        const option = this.elem.querySelector("option:checked ");
        return option ? option.text : null;
    }

}