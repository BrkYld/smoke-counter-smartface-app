import System from '@smartface/native/device/system';
import { OSType } from '@smartface/native/device/system/system';
import TouchableOpacityDesign from 'generated/my-components/TouchableOpacity';


type ButtonTypes = 'success' | 'danger' | 'secondary'

const colors = {
    success: '#1BC5BD',
    danger: '#E71858',
    secondary: '#ADB5BD',
}
export default class TouchableOpacity extends TouchableOpacityDesign {
    pageName?: string | undefined;
    onPress: () => void | null;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.onPress = () => null;
        this.btn.on('touch', () => this.setOpacity('touch'));
        this.btn.on('touchEnded', () => {
            this.setOpacity('touchEnded');
            this.onPress();
        })
    }

    setText(text: string) {
        this.btn.text = text;
    }
    setType(type: ButtonTypes) {
        this.btn.dispatch({
            type: "updateUserStyle",
            userStyle: {
                backgroundColor: {
                   "normal": colors[type],
                   "pressed" : colors[type]
                }
            },
        });
        this.applyLayout();
    }
    setOpacity(event: string) {
        this.btn.dispatch({
            type: "updateUserStyle",
            userStyle: {
                alpha: event === 'touch' ? 0.3 : 1,
            },
        });
    };

    setOnpress(callback: () => void) {
        this.onPress = callback;
    }
}
