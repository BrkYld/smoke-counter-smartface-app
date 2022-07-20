import ModalTimeLineDesign from 'generated/pages/modalTimeLine';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import ListViewItem from '@smartface/native/ui/listviewitem';
import Color from '@smartface/native/ui/color';
import TimeListItem from 'components/TimeListItem';
import MapView from '@smartface/native/ui/mapview';

export default class ModalTimeLine extends withDismissAndBackButton(ModalTimeLineDesign) {
    private disposeables: (() => void)[];
    private dailyReport: DailyReport;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.disposeables = [];
        const { daily } = this.route.getState().routeData;
        this.dailyReport = daily;
    }

    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initDismissButton(this.router);
    }

    buildList() {
        this.timeList.itemCount = this.dailyReport.detail.length;
        this.timeList.verticalScrollBarEnabled = false;
        this.timeList.onRowBind = (listViewItem: TimeListItem, index) => {
            const detail: ReportDetail = this.dailyReport.detail[index];
            const time = `${detail.time.hours < 10 ? `0${detail.time.hours}` : detail.time.hours}:${detail.time.minutes < 10 ? `0${detail.time.minutes}` : detail.time.minutes}:${detail.time.seconds < 10 ? `0${detail.time.seconds}` : detail.time.seconds}`
            listViewItem.timeText.text = time;
        }
        this.timeList.onRowSelected = (listViewItem, index) => {
            this.mapView1.removeAllPins();
            const { location } = this.dailyReport.detail[index];
            const selectedLocation = {
                latitude: parseFloat(location.x),
                longitude: parseFloat(location.y),
            }
            this.mapView1.addPin(new MapView.Pin({
                location: selectedLocation
            }))
            this.mapView1.setCenterLocationWithZoomLevel(selectedLocation, 12, true)
        }
    }
    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.buildList();
    }
}
