import PgHomeDesign from 'generated/pages/pgHome';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Screen from '@smartface/native/device/screen';
import { Service } from 'client';
import Loader from 'components/Loader';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { showMessage } from 'components/ShowMessage';
import LocationService from 'components/LocationService';
import { Data } from '@smartface/native/global';
import store from 'store';
import storeActions from 'store/main/actions';

export default class PgHome extends withDismissAndBackButton(PgHomeDesign) {
    Loader: Loader;
    LocationService : LocationService;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.Loader = new Loader();
        this.LocationService = new LocationService();
    }

    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        // ios
        // this.initBackButton(this.router); //Addes a back button to the page headerbar.
    }
  
    logout(){
        Data.removeVariable('user');
        this.router.replace('/auth/login', {})
    }
    getDailyReport() {
        this.Loader.show();
        Service.User.GetDailyReport().then(response => {
            store.dispatch(storeActions.SetDailyReport(response.data))
        }).finally(() => this.Loader.hide());
    }
    saveSmoke() {
        this.Loader.show();
        this.LocationService.getCurrentLocation(({ latitude, longitude }) => {
            const smokeRequest: SmokeRequest = {
                x: latitude.toString(),
                y: longitude.toString(),
            }
            Service.User.Smoke(smokeRequest).then(() => {
                this.getDailyReport();
            });

        }, () => { this.Loader.hide(); showMessage('Konum izni verilmedi.'); });
    }
    setUIProps() {
        this.headerBar.leftItemEnabled = true;
        this.buttonWrapper.dispatch({
            type: "updateUserStyle",
            userStyle: {
                width: Screen.width / 1.1,
                height: Screen.width / 1.1,
                borderRadius: (Screen.width/1.1) / 2,
                masksToBounds: true,
            },
        });
        this.label2.dispatch({
            type: "updateUserStyle",
            userStyle: {
                font: {
                    size: Screen.width * 0.3
                },
            },
        });
        this.label3.dispatch({
            type: "updateUserStyle",
            userStyle: {
                font: {
                    size: Screen.width * 0.12
                },
                text: 'SMOKE !'
            },
        });
        this.headerBar.setItems([ new HeaderBarItem({
            title: 'Done',
            image: 'images://logout.png',
            onPress: ()=> {this.logout()}
        })]);
    }

    setOpacity() {
        this.buttonWrapper.dispatch({
            type: "updateUserStyle",
            userStyle: {
                alpha: this.buttonWrapper.alpha === 1 ? 0.3 : 1,
            },
        });
    }
    setEvents() {
        this.buttonWrapper.on('touch', () => {
            this.setOpacity();
        })
        this.buttonWrapper.on('touchEnded', () => {
            this.saveSmoke();
            this.setOpacity();
        })
    }
    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.setUIProps();
        this.setEvents();
        this.getDailyReport();
        this.headerBar.leftItemEnabled = false;
        store.subscribe(()=>{
            const { dailyReport } = store.getState().main;
            this.label2.text = dailyReport.count.toString();
            this.headerBar.title = dailyReport.count > 0 ? dailyReport.day : this.headerBar.title;
            this.layout.applyLayout();
        })
        // this.headerBar.setLeftItem(new HeaderBarItem({
        //     title: 'Done',
        //     image: 'images://history.png',
        //     onPress: function () {
        //         console.log('You pressed Done item!');
        //     }
        // }))
        // this.headerBar.android.
  
    }
}
