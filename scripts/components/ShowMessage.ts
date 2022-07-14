import AlertView from "@smartface/native/ui/alertview";
import { ButtonType } from "@smartface/native/ui/alertview/alertview";

export const showMessage = (message : string , title?: string)=> {
    const alert:AlertView = new AlertView({
        title: title ? title : '',
        message
    });
    alert.addButton({
        index: AlertView.Android.ButtonType.POSITIVE,
        type : ButtonType.POSITIVE,
        text: "OK",
        onClick: function (): void {
            console.log("OK clicked.");
        },
    });

    alert.show();
}
