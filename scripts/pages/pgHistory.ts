import PgHistoryDesign from 'generated/pages/pgHistory';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import store from 'store';
import storeActions from 'store/main/actions';
import Loader from 'components/Loader';
import { Service } from 'client';
import ReportListItem from 'components/ReportListItem';
import { showMessage } from 'components/ShowMessage';

export default class PgHistory extends withDismissAndBackButton(PgHistoryDesign) {
    data: SmokingReport;
    Loader: Loader;
    private disposeables: (() => void)[] = [];
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.Loader = new Loader();
        this.data = [];
    }

    buildList() {
        this.reportList.itemCount = 0;
        this.reportList.verticalScrollBarEnabled = false;
        this.reportList.onRowBind = (listViewItem: ReportListItem, index) => {
            const daily: DailyReport = this.data[index];
            listViewItem.data = daily;
            listViewItem.onTimeLineIconTouch(daily => {
                this.router.push('/mainTab/historyStack/modal/timeLine', { daily })
            });
            listViewItem.onMapIconTouch(daily => {
                this.router.push('/mainTab/historyStack/modal/map', { daily })
            })
        }
    }
    refreshList() {
        this.reportList.itemCount = this.data.length;
        this.reportList.refreshData();
    }
    getSmokingReport() {
        this.Loader.show();
        Service.User.GetSmokingReport().then(response => {
            store.dispatch(storeActions.SetSmokingReport(response.data))
        }).finally(() => this.Loader.hide());
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
        this.getSmokingReport();
        this.buildList();
        store.subscribe(() => {
            const { smokingReport } = store.getState().main;
            this.data = [...smokingReport]
            this.refreshList();
        })
    }

    onHide(): void {
        this.dispose();
    }
    dispose(): void {
        // this.disposeables.forEach((item) => item());
    }
}
