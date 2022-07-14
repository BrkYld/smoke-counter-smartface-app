import InputTextFieldDesign from 'generated/my-components/InputTextField';
import { isEmptyBindingElement, textChangeRangeIsUnchanged } from 'typescript';

type InputTypes = 'default' | 'password-hide' | 'password-show'

interface InputPropType {
    icon: string,
    hint: string,
    mask: boolean,
}

interface InputProps {
    [key: string]: InputPropType
}

const types: InputProps = {
    "default": {
        icon: '',
        hint: '',
        mask: false,
    },
    "password-hide": {
        icon: 'images://eye.png',
        hint: 'Şifreniz',
        mask: true,
    },
    "password-show": {
        icon: 'images://eye_closed.png',
        hint: 'Şifreniz',
        mask: false,
    },
}
export default class InputTextField extends InputTextFieldDesign {
    pageName?: string | undefined;
    private __type: InputTypes;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.__type = 'default';
        this.imageView1.on('touch', () => { this.toggleType() });
    }

    toggleType() {
        console.log('INSIDE', this.type)
        if (this.type !== 'default') {
            this.type === 'password-hide' ? this.setType('password-show') : this.setType('password-hide');
        }
    }
    setType(type: InputTypes) {
        this.textBox1.hint = types[type].hint;
        this.imageView1.image = types[type].icon;
        this.textBox1.isPassword = types[type].mask;
        this.__type = type;
    }

    setHint(hint: string) {
        this.textBox1.hint = hint;
    }

    get text(): string {
        return this.textBox1.text;
    }
    get type(): InputTypes {
        return this.__type;
    }
}
