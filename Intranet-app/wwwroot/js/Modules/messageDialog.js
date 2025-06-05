import { MessageType } from "./message.js";

const messageDialogCollection = [];

const createDialog = (message, title, type, callbackConfirm, callback) => {
    const dialog = document.createElement("dialog");
    dialog.className = "c-message-dialog";
    if (type)
        dialog.dataset.type = type;

    const dialogContent = document.createElement("div");
    dialogContent.className = "c-message-dialog__content";
    const dialogMessage = document.createElement("div");
    dialogMessage.className = "c-message-dialog__message";
    dialogContent.appendChild(dialogMessage);

    //if title info exists, add to dialog
    if (title) {
        const titleText = document.createElement("span");
        titleText.className = "c-message-dialog__message__title";
        titleText.textContent = title;
        dialogMessage.appendChild(titleText);
    }

    //message text is created and added to dialog
    const text = document.createElement("p");
    text.className = "c-message-dialog__message__text";
    text.textContent = message;
    dialogMessage.appendChild(text);
    dialog.appendChild(dialogContent);

    //create button actions for dialog
    const dialogButtons = document.createElement("div");
    dialogButtons.className = "c-message-dialog__buttons";
    dialog.appendChild(dialogButtons);

    //create close button and add to dialog
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "c-message-dialog__buttons__item";
    closeButton.textContent = "Close";

    if (type == MessageType.CONFIRM) {
        closeButton.className = "c-message-dialog__buttons__item c-message-dialog__buttons__item--outline";
        closeButton.textContent = "No";

        const confirmButton = document.createElement("button");
        confirmButton.type = "button";
        confirmButton.className = "c-message-dialog__buttons__item";
        confirmButton.textContent = "Yes";
        if (callbackConfirm != undefined && typeof (callbackConfirm) == "function") {
            confirmButton.onclick = () => {
                callbackConfirm();
                closeDialog(dialog);
            }
        }
        dialogButtons.appendChild(confirmButton);
    }

    if (callback != undefined && typeof (callback) == "function") {
        closeButton.onclick = () => {
            callback();
            closeDialog(dialog);
        }
    }
    else {
        closeButton.onclick = () => {
            closeDialog(dialog);
        }
    }

    dialogButtons.appendChild(closeButton);

    return dialog;
}

function closeDialog(dialog) {
    messageDialogCollection.shift();
    dialog.close();
    dialog.remove();
}

const messageDialogObserver = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
        if (messageDialogCollection.length > 0 && mutation.type === "childList" && mutation.target.nodeName === "BODY" && mutation.removedNodes.length > 0
            && Array.from(mutation.removedNodes).some(i => i.nodeName === "DIALOG" && i.className === "c-message-dialog")) {
            messageDialogCollection[0]();
        }
    }
});

messageDialogObserver.observe(document.body, { childList: true });

export default class MessageDialog {
    static #showDialog(message, title = undefined, type = undefined, callback = undefined, callbackConfirm = undefined) {
        messageDialogCollection.push(() => {
            let dialog = createDialog(message, title, type, callbackConfirm, callback);
            document.body.appendChild(dialog);
            setTimeout(() => {
                dialog.showModal();
            }, 50);
        });

        if (messageDialogCollection.length == 1)
            messageDialogCollection[0];
    }

    static show(message, title = undefined, callback = undefined) {
        this.#showDialog(message, title, undefined, callback);
    }

    static error(message, title = undefined, callback = undefined) {
        this.#showDialog(message, title, MessageType.ERROR, callback);
    }

    static warning(message, title = undefined, callback = undefined) {
        this.#showDialog(message, title, MessageType.WARNING, callback);
    }

    static info(message, title = undefined, callback = undefined) {
        this.#showDialog(message, title, MessageType.INFO, callback);
    }

    static success(message, title = undefined, callback = undefined) {
        this.#showDialog(message, title, MessageType.SUCCESS, callback);
    }

    static confirm(message, title = undefined, callbackConfirm = undefined, callback = undefined) {
        this.#showDialog(message, title, MessageType.CONFIRM, callback, callbackConfirm)
    }
}















