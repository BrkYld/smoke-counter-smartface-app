import Color from "@smartface/native/ui/color";
import Image from "@smartface/native/ui/image";
import { BottomTabBarRouter, NativeStackRouter, Route } from "@smartface/router";
import { HistoryPage, HomePage } from '../pages/index'
const bottomTabbarRouter = BottomTabBarRouter.of(
    {
        path: '/mainTab',
        to:'/mainTab/homeStack',
        tabbarParams: () => (
            {
                ios: { translucent: false },
                itemColor: {
                    normal:Color.create('#8F9BB3'),
                    selected: Color.create('#E71858'),
                },
                backgroundColor:Color.WHITE,
            }
        ),
        items: [
            { title: 'Ana Sayfa', icon: Image.createFromFile('images://home.png')},
            { title: 'Geçmiş', icon: Image.createFromFile('images://history.png')},
        ],
        routes: [
            NativeStackRouter.of({
                path:'/mainTab/homeStack',
                to:'/mainTab/homeStack/home',
                routes:[
                    Route.of<HomePage>({
                        path:'/mainTab/homeStack/home',
                        build(router, route) {
                            const page = new HomePage(router,route);
                            return page;
                        }
                    })
                ]
            }),
            NativeStackRouter.of({
                path:'/mainTab/historyStack',
                to:'/mainTab/historyStack/history',
                routes:[
                    Route.of<HistoryPage>({
                        path:'/mainTab/historyStack/history',
                        build(router, route) {
                            const page = new HistoryPage(router,route);
                            return page;
                        }
                    })
                ]
            })
        ]
    }
)

export default bottomTabbarRouter;