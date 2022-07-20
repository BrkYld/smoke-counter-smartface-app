import System from "@smartface/native/device/system";
import Color from "@smartface/native/ui/color";
import Image from "@smartface/native/ui/image";
import { BottomTabBarRouter, NativeStackRouter, Route } from "@smartface/router";
import ModalMapView from "pages/modalMapView";
import { HistoryPage, HomePage, TimeLineModal } from '../pages/index'
const bottomTabbarRouter = BottomTabBarRouter.of(
    {
        path: '/mainTab',
        to: '/mainTab/homeStack',
        tabbarParams: () => (
            {
                ios: { translucent: false },
                itemColor: {
                    normal: Color.create('#8F9BB3'),
                    selected: Color.create('#E71858'),
                },
                backgroundColor: Color.WHITE,
            }
        ),
        items: [
            { title: 'Ana Sayfa', icon: Image.createFromFile('images://home.png') },
            { title: 'Geçmiş', icon: Image.createFromFile('images://history.png') },
        ],
        routes: [
            NativeStackRouter.of({
                path: '/mainTab/homeStack',
                to: '/mainTab/homeStack/home',
                routes: [
                    Route.of<HomePage>({
                        path: '/mainTab/homeStack/home',
                        build(router, route) {
                            const page = new HomePage(router, route);
                            return page;
                        }
                    })
                ]
            }),
            NativeStackRouter.of({
                path: '/mainTab/historyStack',
                to: '/mainTab/historyStack/history',
                routes: [
                    Route.of<HistoryPage>({
                        path: '/mainTab/historyStack/history',
                        build(router, route) {
                            const page = new HistoryPage(router, route);
                            return page;
                        }
                    }),
                    NativeStackRouter.of({
                        path: '/mainTab/historyStack/modal',
                        to: '/mainTab/historyStack/modal/map',
                        modal: true,
                        modalType: System.OS === System.OSType.IOS ? 'bottom-sheet' : 'modal',
                        routes: [
                            Route.of<ModalMapView>({
                                path: '/mainTab/historyStack/modal/map',
                                build(router, route) {
                                    return new ModalMapView(router, route);
                                }
                            }),
                            Route.of<TimeLineModal>({
                                path: '/mainTab/historyStack/modal/timeLine',
                                build(router, route) {
                                    return new TimeLineModal(router, route);
                                }
                            })
                        ]
                    })
                ]
            })
        ]
    }
)

export default bottomTabbarRouter;