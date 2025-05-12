

export default class FormControl {
    #decimals = 0;
    #numberMask = false;
    #value = "";
    #emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor(id, decimals = 0, maxLength = 0) {
        super(document.getElementById(id).parentNode);
        this.elem = document.getElementById(id);
        this.#decials = decimals;
        if (this.elem.nodeName === "INPUT" && this.elem.getAttribute("inputmode") === "numberic") {

        }

    }

}