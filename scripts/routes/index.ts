import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';

import { LoginPage } from '../pages/index'
import System from '@smartface/native/device/system';

Application.on('backButtonPressed', () => {
    NativeRouter.getActiveRouter()?.goBack();
});

const router = NativeRouter.of({
    path: '/',
    isRoot: true,
    routes: [
        NativeStackRouter.of({
            path: '/pages',
            routes: [
                Route.of<LoginPage>({
                    path: '/pages/login',
                    build(router, route) {
                        return new LoginPage(router, route);
                    }
                }),
            ]
        })
    ]
});

let listenerCounter = 0;
router.listen((location, action) => {
    if (System.isEmulator) {
        console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
    }
});

export default router;
