import System from "@smartface/native/device/system";
import { OSType } from "@smartface/native/device/system/system";
import Dialog from "@smartface/native/ui/dialog";
import FlexLayout from "@smartface/native/ui/flexlayout";
import GifImage from "@smartface/native/ui/gifimage";
import GifImageView from "@smartface/native/ui/gifimageview";
import { ImageFillType } from "@smartface/native/ui/imageview/imageview";
import { styleableComponentMixin } from "@smartface/styling-context";

class StyleableGifImageView extends styleableComponentMixin(GifImageView) { }

export default class Loader {
    myDialog: Dialog;
    myGifImageView: StyleableGifImageView;
    isShow: boolean;
    constructor() {
        this.myDialog = new Dialog();
        this.myDialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
        this.myDialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.isShow = false;
    }

    show() {
        this.myDialog.layout.accessible = false;
        if(!this.isShow){
            this.isShow = true;
            const gifImage = GifImage.createFromFile("assets://loader.gif");
            this.myGifImageView = new StyleableGifImageView({
                gifImage,
            });
            this.myGifImageView.width = 100;
            this.myGifImageView.height = 100;
            this.myGifImageView.imageFillType = ImageFillType.STRETCH;
            this.myGifImageView.masksToBounds = true;
            this.myDialog.layout.addChild(this.myGifImageView);
        }
        this.myDialog.show();
    }
    hide() {
        this.isShow = false;
        this.myDialog.layout.removeChild(this.myGifImageView);
        this.myDialog.hide();
        this.myDialog.layout.accessible = true;
    }
}
