import PgLoginDesign from 'generated/pages/pgLogin';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import AlertView from '@smartface/native/ui/alertview';
import Color from '@smartface/native/ui/color';
import { styleableComponentMixin } from '@smartface/styling-context';
import Dialog from '@smartface/native/ui/dialog';
import GifImageView from '@smartface/native/ui/gifimageview';
import Loader from 'components/Loader';
import { Data } from '@smartface/native/global';
import { Service } from 'client';
import { showMessage } from 'components/ShowMessage';


class StyleableGifImageView extends styleableComponentMixin(GifImageView) { }



export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
    alert: AlertView;
    myDialog: Dialog;
    myGifImageView: StyleableGifImageView;
    Loader: Loader
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.Loader = new Loader();
    }

    setOpacity(event: string) {
        this.button2.dispatch({
            type: "updateUserStyle",
            userStyle: {
                alpha: event === 'touch' ? 0.3 : 1,
            },
        });
    };
    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        // this.initBackButton(this.router); //Addes a back button to the page headerbar.
        console.log('pageLogin onShow')
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.button2.on('touch', () => this.setOpacity('touch'));
        this.button2.on('touchEnded', async () => {
            this.setOpacity('touchEnded');
            this.Loader.show();
            Service.Auth.Login({ userName: this.textBox1.text, password: this.textBox2.text }).then((response) => {
                if (response) {
                    Data.setStringVariable('user', response.data)
                    this.router.replace('/mainTab', {});
                } else {
                   showMessage('User doesnt exists')
                }

            }).finally(() => this.Loader.hide());
        });
        this.label6.on('touch', () => { this.router.push('/auth/register') });
        this.switch1.toggle = false;
        this.headerBar.leftItemEnabled = false;
        this.headerBar.backgroundColor = Color.create('#E71858');
        this.textBox2.isPassword = true;
    }
}
