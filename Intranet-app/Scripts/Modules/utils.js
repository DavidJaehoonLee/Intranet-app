export default class Utils {
    static removeHtmlTags(string) {
        let result = string.replace(/<\/?[^>]+(>|$)/g, ""); // Remove Html Tags
        result = result.replace(/&(?!gt;|lt;)[^;]+;/g, ""); // Remove HTML entities except &gt; &lt; because those 2 are required
        result = result.replace("&gt;", ">").replace("&lt;", "<"); // replace &gt; for > and &lt for <
        return result;
    }

    static reloadCurrentPage(secondsToWaitBeforeReload = 5) {
        const miliseconds = Number(secondsToWaitBeforeReload) * 1000;
        setTimeout(() => window.location.reload(), miliseconds);
    }
}
