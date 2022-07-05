import PgLoginDesign from 'generated/pages/pgLogin';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import AlertView from '@smartface/native/ui/alertview';

export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
    alert : AlertView;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    setOpacity(event: string) {
        this.button2.dispatch({
            type: "updateUserStyle",
            userStyle: {
              alpha: event=== 'touch' ? 0.3 : 1 ,
            },
          });
        this.layout.applyLayout();
    };

    showAlert(){
        this.alert = new AlertView({
            title: "Alert Title",
            message: "Alert Message",
          });
          this.alert.show();
    }
    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
        console.log('pageLogin onShow')
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.button2.on('touch', () => this.setOpacity('touch'));
        this.button2.on('touchEnded', () => this.setOpacity('touchEnded'));
        this.label6.on('touch', this.showAlert);
        this.switch1.toggle = false;
    }
}
