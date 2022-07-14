interface UserInfo {
    userName: string,
    password: string,
    id?: string
}

interface SmokeRequest{
    x: string,
    y: string
}

interface ApiResponse<T> {
    error: boolean,
    data: T,
    message: string
}
interface SmokeLocation {
    x: string,
    y: string,
}
interface ReportDetail{
    time: {
        seconds:number,
        minutes:number,
        hours:number,
    },
    location: SmokeLocation
}

interface DailyReport{
    count: number,
    day: string,
    detail: ReportDetail[]
}

type SmokingReport = DailyReport[]