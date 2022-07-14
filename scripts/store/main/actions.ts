import { ActionTypes, Constants } from "store/main";

export default class Actions {
    static SetDailyReport(daily: DailyReport): ActionTypes {
        return {
            type: Constants.SET_DAILY_REPORT,
            payload: daily
        }
    }
    static SetSmokingReport(report: SmokingReport): ActionTypes {
        return {
            type: Constants.SET_SMOKING_REPORT,
            payload: report
        }
    }
}