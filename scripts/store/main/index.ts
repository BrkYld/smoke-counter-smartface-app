export interface State{
    dailyReport: DailyReport,
    smokingReport: SmokingReport,
}

export namespace Constants{
    export const SET_DAILY_REPORT = 'SET_DAILY_REPORT';
    export const SET_SMOKING_REPORT = 'SET_SMOKING_REPORT';
}

declare namespace Actions{
    export interface SetDailyReport{
        type: typeof Constants.SET_DAILY_REPORT;
        payload: DailyReport;
    }
    export interface SetSmokingReport{
        type: typeof Constants.SET_SMOKING_REPORT;
        payload: SmokingReport;
    }
}

export type ActionTypes = Actions.SetDailyReport | Actions.SetSmokingReport