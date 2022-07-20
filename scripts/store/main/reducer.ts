import { ActionTypes, Constants, State } from "store/main";

const initialState: State = {
    smokingReport: [],
    dailyReport: { count: 0, day: '', detail: [] }
}

export default function (state = initialState, action: ActionTypes): State {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.SET_DAILY_REPORT: {
            newState = { ...newState, dailyReport: action.payload };
            if(newState.smokingReport.length > 0){
                newState.smokingReport.shift();
                newState.smokingReport.unshift(action.payload);
            }
            break;
        }
        case Constants.SET_SMOKING_REPORT: {
            newState = { ...newState, smokingReport: action.payload.reverse() };
            break;
        }
        default: {
            break;
        }
    }
    
    return newState;
}