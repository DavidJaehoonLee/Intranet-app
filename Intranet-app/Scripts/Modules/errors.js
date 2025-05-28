const createError = name => {
    return class Exception extends Error {
        constructor(message) {
            super(message);
            this.name = name;
            this.stack = false;
        }
    }
}

export const FetchError = createError("FetchError");
export const InputTextError = createError("InputTextError");
export const MessageDialogError = createError("MessageDialogError");
export const MessageLoaderError = createError("MessageLoaderError");