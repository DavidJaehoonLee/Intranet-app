import MessageDialog from "../Modules/messageDialog.js";
import MessageLoader from "../Modules/messageLoader.js";
import Toast, { ToastLength } from "../Modules/toast.js";
import getModel from "./request.js"

export async function onClickSubmitHandler(event) {
    // TODO: Move validation function to here
    MessageLoader.show("Submiting your request, please wait a bit.", "Doc Request");
    const form = getModel();
    addAntiForgeryToken(form, "");

    try {
        const request = await fetch("/Mobile/DocumentRequest/Save",
            {
                method: "POST",
                body: form
            });
        if (!request.ok) {
            MessageLoader.close();
            MessageDialog.error(`There was an error when submiting your request with status: ${request.status}`,
                "Doc Request");
            return;
        }

        const response = await request.json();
        if (!response.success) {
            MessageLoader.close();
            MessageDialog.error(`There was an error when submiting your request: ${response.errMessage}`,
                "Doc Request");
            if (response.shouldRedirect) {
                MessageLoader.message = "Redirecting to Loan Summary...";
                document.getElementById("footerMenuSummary").click();
            }
            return;
        }

        Toast.info("Your request has been submitted with success", ToastLength.LONG);
        setTimeout(() => {
            MessageLoader.message = "Redirecting to Loan Summary...";
            document.getElementById("footerMenuSummary").click();
        }, ToastLength.SHORT);

    } catch (e) {
        //console.log(e);
        Toast.error(`There was an error when submiting your request: ${e.message ? e.message : ""}`, ToastLength.LONG);
        return;
    }
}