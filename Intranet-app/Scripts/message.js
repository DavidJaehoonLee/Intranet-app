export const MessageType = Object.freeze({
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
    CONFIRM: "confirm"
});

export default class Message {
    constructor(container) {
        this.container = container;
        this.message = "";
    }

    #setMessage(type, message) {
        this.container.dataset.type = type;
        this.container.dataset.msg = message;
        this.message = message;
    }

    setErrorMessage(message) {
        this.#setMessage(MessageType.ERROR, message);
    }

    setWarningMessage(message) {
        this.#setMessage(MessageType.WARNING, message);
    }

    setInfoMessage(message) {
        this.#setMessage(MessageType.INFO, message);
    }

    setSuccessMessage(message) {
        this.#setMessage(MessageType.SUCCESS, message);
    }

    clearMessage() {
        delete this.container.dataset.type;
        delete this.container.dataset.msg;
        this.message = "";
    }
}