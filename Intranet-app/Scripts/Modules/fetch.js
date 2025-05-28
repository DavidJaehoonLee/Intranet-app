import { FetchError } from './errors.js';

export default class Fetch {
    constructor(url = "") {
        if (url === undefined || typeof (url) !== "string")
            throw new FetchError(`The URL value is not valid. It must be an string.`);
        this.reset();
        this.endpoint = url.trim().replace(/\/\/*/g, "/");
    }

    #methodValidation(value) {
        if (!["undefined", "number", "string"].includes(typeof (value)))
            throw new FetchError(`Input must be number or string`);
        else if (value !== undefined)
            this.parameter = String(value);
    }

    #configValidation(value) {
        if (Array.isArray(value) || typeof (value) !== "object")
            throw new FetchError(`Input must be an object`);
    }

    reset() {
        this.parameter = "";
        this.queryString = "";
        this.headers = { 'Content-Type': 'application/json' };
        this.authentication = {};
        this.method = "GET";
        this.body = {};
    }

    url(value = undefined) {
        if (typeof (value) !== "string" || value.trim() === "")
            throw new FetchError(`Input must be an string`);
        this.endpoint = value.trim().replace(/\/\/*/g, "/");
        return this;
    }

    get(param = undefined) {
        this.#methodValidation(param);
        this.method = "GET";
        return this;
    }

    post(data = undefined) {
        if (!["undefined", "object"].includes(typeof (param)))
            throw new FetchError(`Input must be an object/array`);
        else if (data !== undefined)
            this.body = JSON.stringify(data);
        this.method = "POST";
        return this;
    }

    put(param = undefined) {
        this.#methodValidation(param);
        this.method = "PUT";
        return this;
    }

    patch(param = undefined) {
        this.#methodValidation(param);
        this.method = "PATCH";
        return this;
    }

    delete(param = undefined) {
        this.#methodValidation(param);
        this.method = "DELETE";
        return this;
    }

    params(value) {
        this.#configValidation(value);
        this.queryString = new URLSearchParams(value).toString();
        return this;
    }

    header(value) {
        this.#configValidation(value);
        this.headers = value;
        this.headers = { ...this.headers, ...this.authentication };
        return this;
    }

    auth(value) {
        this.authentication = value;
        if (!["string", "object"].includes(typeof (value)) || Array.isArray(value))
            throw new FetchError(`Input must be an object or string`);
        else if (typeof (value) === "string")
            this.authentication = { "Authorization": value };
        this.headers = { ...this.headers, ...this.authentication };
        return this;
    }

    data(value) {
        if (typeof (value) !== "object")
            throw new FetchError(`Input must be an object/array`);
        this.body = JSON.stringify(value);
        return this;
    }

    async execute() {
        if (this.endpoint == undefined || typeof (this.endpoint) !== "string" || this.endpoint.trim() === "")
            throw new FetchError(`The Url can not be empty or its value is wrong. \nCurrent Value: ${this.endpoint}`);

        const config = {
            method: this.method,
            headers: this.headers,
            body: this.body,
        };

        if (this.method === "GET")
            delete config.body;

        let url = this.endpoint;
        if (this.parameter.trim() !== "") {
            url += `/${this.parameter}`;
        }

        this.reset();
        const reponse = await fetch(url, config);
        if (reponse.ok) {
            const json = await response.json();
            return json;
        }
        return null;
    }

}