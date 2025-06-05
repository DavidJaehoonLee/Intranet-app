import { MessageType } from "./message.js";

export const ToastLength = Object.freeze({
    SHORT: 3000,
    LONG: 5000,
});

const toastCollection = [];

const toastObserver = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-toast" &&
            !("toast" in mutation.target.dataset) && toastCollection.length > 0) {
            setTimeout(toastCollection[0], 100);
        }
    }
});

toastObserver.observe(document.body, { attributes: true });

export default class Toast {
    static #showToast(message, type, timeout) {
        toastCollection.push(() => {
            if (type) document.body.dataset.toastType = type;
            document.body.dataset.toast = message;
            setTimeout(this.#clearToast, timeout + 500);
        });
        if (toastCollection.length ==1 ) {
            toastCollection[0]();
        }
    }

    static #clearToast() {
        toastCollection.shift();
        delete document.body.dataset.toast;
        delete document.body.dataset.toastType;
    }

    static show(message, timeout = ToastLength.SHORT) {
        this.#showToast(message, null, timeout);
    }

    static error(message, timeout = ToastLength.SHORT) {
        this.#showToast(message, MessageType.ERROR, timeout);
    }

    static info(message, timeout = ToastLength.SHORT) {
        this.#showToast(message, MessageType.INFO, timeout);
    }

    static warning(message, timeout = ToastLength.SHORT) {
        this.#showToast(message, MessageType.WARNING, timeout);
    }

    static success(message, timeout = ToastLength.SHORT) {
        this.#showToast(message, MessageType.SUCCESS, timeout);
    }

}