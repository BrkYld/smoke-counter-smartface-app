import Image from '@smartface/native/ui/image';
import InputTextFieldDesign from 'generated/my-components/InputTextField';

export default class InputTextField extends InputTextFieldDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
  
  set hint(hint:string){
      this.textBox1.hint = hint;
  }
}
