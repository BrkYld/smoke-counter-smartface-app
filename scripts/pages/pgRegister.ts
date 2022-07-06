import PgRegisterDesign from 'generated/pages/pgRegister';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgRegister extends withDismissAndBackButton(PgRegisterDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
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
    this.backButton.setType('secondary');
    this.backButton.setText('Geri');
    this.confirmButton.setType('success');
    this.confirmButton.setText('Kayıt olma');
    this.headerBar.leftItemEnabled = false;
  }
}
