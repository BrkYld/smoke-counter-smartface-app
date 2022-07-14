import CustomListDesign from 'generated/my-components/CustomList';

export default class CustomList extends CustomListDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
