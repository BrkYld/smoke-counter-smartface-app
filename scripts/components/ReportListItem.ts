import ReportListItemDesign from 'generated/my-components/ReportListItem';
import { showMessage } from './ShowMessage';

export default class ReportListItem extends ReportListItemDesign {
    pageName?: string | undefined;
    private __onTimeLineIconTouch: (data: DailyReport) => void | null;
    private __onMapIconTouch: (data: DailyReport) => void | null;
    private disposeables: (() => void)[];
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.__onTimeLineIconTouch = () => null;
        this.__onMapIconTouch = () => null;
        this.disposeables = [];
    }

    onTimeLineIconTouch(callback: (data: DailyReport) => void) {
        this.__onTimeLineIconTouch = callback;
    }

    onMapIconTouch(callback: (data: DailyReport) => void) {
        this.__onMapIconTouch = callback;
    }

    dispose(): void {
        this.disposeables.forEach((item) => item());
        this.disposeables = [];
    }
    set data(daily: DailyReport) {
        this.timeLineIcon.image = 'images://timeline.png';
        this.mapIcon.image = 'images://map_search.png';
        this.dateText.text = daily.day;
        this.smokeCountText.text = `${daily.count} SIGARA`;
        this.dispose();
        this.disposeables.push(
            this.timeLineIcon.on('touchEnded', () => this.__onTimeLineIconTouch(daily)),
            this.mapIcon.on('touchEnded', () => this.__onMapIconTouch(daily))
        )
    }
}
