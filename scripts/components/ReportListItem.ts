import ReportListItemDesign from 'generated/my-components/ReportListItem';

export default class ReportListItem extends ReportListItemDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
