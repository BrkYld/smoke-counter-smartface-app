import Application from '@smartface/native/application';
import { BarcodeScannerFormat } from '@smartface/native/device/barcodescanner/barcodescanner';
import Location from '@smartface/native/device/location';
import Permission from '@smartface/native/device/permission';
import { PermissionIOSAuthorizationStatus, Permissions } from '@smartface/native/device/permission/permission';
import System from '@smartface/native/device/system';
import Loader from './Loader';



export default class LocationService {
    constructor() {
        
    }
    private requestPermissionIOS() {
        Location.start('HIGH_ACCURACY', 1000);
        Location.stop();
        while (true) {
            if (Permission.ios.getAuthorizationStatus(Permissions.IOS.LOCATION) !== PermissionIOSAuthorizationStatus.NOT_DETERMINED) {
                return;
            }
        }
    }
    private getLocationIOS(callback: ({ latitude, longitude }: { [key: string]: number }) => void, error?: () => void) {
        switch (this.checkPermissionIOS()) {
            case true: {
                Location.start('HIGH_ACCURACY', 1000);
                Location.once('locationChanged', ({ latitude, longitude }) => {
                    Location.stop();
                    callback({ latitude, longitude })
                });
                return;
            }
            case false: {
                error();
                return;
            }
        }
    }
    private checkPermissionIOS(): boolean {
        if (Permission.ios.getAuthorizationStatus(Permissions.IOS.LOCATION) === PermissionIOSAuthorizationStatus.NOT_DETERMINED) {
            this.requestPermissionIOS();
            this.checkPermissionIOS();
        }

        if (Permission.ios.getAuthorizationStatus(Permissions.IOS.LOCATION) === PermissionIOSAuthorizationStatus.DENIED) {
            return false;
        }
        return true;
    }
    private getLocationAndroid(callback: ({ latitude, longitude }: { [key: string]: number }) => void, error?: () => void) {
        if (!Permission.android.checkPermission(Permissions.ANDROID.ACCESS_FINE_LOCATION)) {
            Permission.android.requestPermissions(Permissions.ANDROID.ACCESS_FINE_LOCATION).then((e) => {
                if (e[0] === 0) {
                    this.getCurrentLocation(callback);
                } else {
                    error();
                }
            })
            return;
        }
        Location.start('HIGH_ACCURACY', 1000);
        Location.once('locationChanged', ({ latitude, longitude }) => {
            Location.stop();
            callback({ latitude, longitude })
        });
    }

    public getCurrentLocation(callback: ({ latitude, longitude }: { [key: string]: number }) => void, error?: () => void) {
        if (System.OS === System.OSType.ANDROID) {
            this.getLocationAndroid(callback, error);
        } else {
            this.getLocationIOS(callback, error)
        }
    }

}
