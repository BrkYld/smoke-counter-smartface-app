import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import TabNavigator from './tabbar';
import { LoginPage, RegisterPage } from '../pages/index'
import System from '@smartface/native/device/system';

Application.on('backButtonPressed', () => {
    NativeRouter.getActiveRouter()?.goBack();
});

const router = NativeRouter.of({
    path: '/',
    isRoot: true,
    routes: [
        NativeStackRouter.of({
            path: '/auth',
            to:'/auth/login',
            routes: [
                Route.of<LoginPage>({
                    path: '/auth/login',
                    build(router, route) {
                        return new LoginPage(router, route);
                    }
                }),
                Route.of<RegisterPage>({
                    path: '/auth/register',
                    build(router, route) {
                        return new RegisterPage(router, route);
                    }
                }),
            ]
        }),
        TabNavigator,
    ]
});

let listenerCounter = 0;
router.listen((location, action) => {
    if (System.isEmulator) {
        console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
    }
});

export default router;
