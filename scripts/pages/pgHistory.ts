import PgHistoryDesign from 'generated/pages/pgHistory';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { styleableComponentMixin, styleableContainerComponentMixin } from '@smartface/styling-context';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import Screen from '@smartface/native/device/screen';
import ReportListItem from 'components/ReportListItem';

// class StyleableGridViewItem extends styleableComponentMixin(GridViewItem1) {}

export default class PgHistory extends withDismissAndBackButton(PgHistoryDesign) {
    data : Array<string> = ["B", "U", "R", "A", "K", "U", "R", "A", "K", "U", "R", "A", "K", "U", "R", "A", "K", "U", "R", "A", "K"]
    index:number = 0;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    
    setUIProps() {
        // this.reportList.dispatch({
        //     type: "updateUserStyle",
        //     userStyle: {
        //         width: Screen.width * 0.9,
        //     },
        // });
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
        this.reportList.refreshEnabled = false;
        this.reportList.itemCount = this.data.length;
       // this.reportList.le
        this.reportList.onItemCreate =  () => {
            let gridViewItem = new ReportListItem();
    
            this.reportList.dispatch({
                type: 'addChild',
                component: gridViewItem,
                name: `gridViewItem${++this.index}`
              });
            //@ts-ignore
            return gridViewItem;
          }
        this.reportList.onItemBind = (gridViewItem, index)=> {
            let data = this.data[index];
            // //@ts-ignore
            // gridViewItem.label1.text = data;
             
            //@ts-ignore
             // gridViewItem.label2.text = data;
        }

        this.reportList.layoutManager.onItemLength = () => Screen.height * 150/657

    }
}
