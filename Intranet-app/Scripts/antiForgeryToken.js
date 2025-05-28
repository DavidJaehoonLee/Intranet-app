
function addAntiForgeryToken(data, containerSelector) {
    if (!data) {
        data = {};
    }

    let token = null;
    const tokenInputBySelector = document.querySelector(`${containerSelector} input[name='__RequestVerificationToken']`);

    if (tokenInputBySelector) {
        token = tokenInputBySelector.value;
    } else {
        const anyTokenInput = document.querySelector("iput[name='__RequestVerificationToken']");

        if (anyTokenInput) {
            token = anyTokenInput.value;
        }
    }

    if (token) {
        if (data instanceof FormData) {
            if (!data.has("__RequestVerificationToken")) {
                data.append("__RequestVerificationToken", token);
            }
        } else if (typeof data === "object") {
            if (!data.hasOwnProperty("__RequestVerificationToken")) {
                data.__RequestVerificationToken = token;
            }
        } else {
            if (!data.includes("__RequestVerification")) {
                data += "&__RequestVerificationToken=" + encodeURIComponent(token);
            }
        }
    }

    return data;
}