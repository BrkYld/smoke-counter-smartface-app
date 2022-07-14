import PgRegisterDesign from 'generated/pages/pgRegister';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import System from '@smartface/native/device/system';
import { Service } from 'client';
import Loader from 'components/Loader';

export default class PgRegister extends withDismissAndBackButton(PgRegisterDesign) {
    Loader: Loader;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.Loader = new Loader();
    }

    setUIProps() {
        this.headerBar.backgroundColor = Color.create('#E71858')
        this.headerBar.title = '';
        this.backButton.setType('secondary');
        this.backButton.setText('Geri');
        this.confirmButton.setType('success');
        this.confirmButton.setText('Kayıt ol');
        this.userNameText.setHint('Kullanıcı Adınız');
        this.passwordText.setType('password-hide');
    }

    setEvents() {
        this.backButton.setOnpress(() => {
            this.router.goBack();
        });
        this.confirmButton.setOnpress(() => {
            this.Loader.show();
            Service.Auth.Register({ userName: this.userNameText.text, password: this.passwordText.text }).then(response => {
                if (response) {
                    this.router.goBack();       
                }
            }).finally(() => this.Loader.hide())
        })
    }
    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.setUIProps();
        this.setEvents();
    }
}
