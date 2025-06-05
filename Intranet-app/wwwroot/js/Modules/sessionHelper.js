// - naming rule:
// prop name : group/controller + _ + key
// prop value : _session_group_key_ in lower case
// ex) PIPELINE_FILTERS_STATUS = _session_pipeline_filters_status_
export const SESSION_KEY = Object.freeze({
    PIPELINE_FILTERS: "_session_pipeline_filters_"
});

export default class SessionHelper {
    static set(sessionKey, value) {
        sessionStorage.setItem(sessionKey, JSON.stringify(value));
    }

    static get(sessionKey) {
        return JSON.parse(sessionStorage.getItem(sessionKey));
    }

    static remove(sessionKey) {
        sessionStorage.removeItem(sessionKey);
    }

    static clear() {
        sessionStorage.clear();
    }
}