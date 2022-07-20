import TimeListItemDesign from 'generated/my-components/TimeListItem';

export default class TimeListItem extends TimeListItemDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
