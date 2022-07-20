import ModalMapViewDesign from 'generated/pages/modalMapView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import MapView from '@smartface/native/ui/mapview';

export default class ModalMapView extends withDismissAndBackButton(ModalMapViewDesign) {
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
        const centerLocation= {
            latitude : parseFloat(this.dailyReport.detail[0].location.x),
            longitude: parseFloat(this.dailyReport.detail[0].location.y),
        }
        this.mapView1.setCenterLocationWithZoomLevel(centerLocation, 5, false);
        this.dailyReport.detail.map(detail => {
            const pin = new MapView.Pin({
                location : {
                    latitude : parseFloat(detail.location.x),
                    longitude: parseFloat(detail.location.y),
                }
            });
            this.mapView1.addPin(pin);
        })
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
    }
    onHide(): void {
        this.dispose();
    }
    dispose(): void {
        this.disposeables.forEach((item) => item());
    }
}
