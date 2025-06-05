import { MessageLoaderError } from "./errors.js";

const createLoader = (message, title) => {
    const dialog = document.createElement("dialog");
    dialog.className = "c-message-loader";

    const loader = document.createElement("div");
    loader.className = "o-loader";

    const dialogContent = document.createElement("div");
    dialogContent.className = "c-message-loader__content";
    const dialogMessage = document.createElement("div");
    dialogMessage.className = "c-message-loader__message";
    dialogContent.append(loader, dialogMessage);

    //if title info exists, add to dialog
    if (title) {
        const titleText = document.createElement("span");
        titleText.className = "c-message-loader__message__title";
        titleText.textContent = title;
        dialogMessage.appendChild(titleText);
    }

    //message text is created and added to dialog
    const text = document.createElement("p");
    text.className = "c-message-loader__message__text";
    text.textContent = message;
    dialogMessage.appendChild(text);
    dialog.append(dialogContent);

    return dialog;
}

export default class MessageLoader {
    static #element = undefined;

    static show(message, title = undefined) {
        this.#element = createLoader(message, title);
        document.body.appendChild(this.#element);
        this.#element.showModal();
    }

    static set title(title) {
        if (this.#element == undefined)
            throw new MessageLoaderError("You need to call first the method show");
        this.#element.querySelector(".c-message-loader__message__title").textContent = title;
    }

    static set message(message) {
        if (this.#element == undefined)
            throw new MessageLoaderError("You need to call first the method show");
        this.#element.querySelector(".c-message-loader__message__text").textContent = message;
    }

    static close() {
        if (this.#element == undefined)
            throw new MessageLoaderError("You need to call first the method show");
        this.#element.close();
        this.#element.remove();
    }
}