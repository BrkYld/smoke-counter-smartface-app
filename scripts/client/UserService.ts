import Data from "@smartface/native/global/data";
import { Fetch } from './fetch';

const baseUrl = 'http://34.68.206.255:3000/api';
const endPoints = {
  smoke: `/user/smoke`,
  daily: `/user/daily`
};

const header = async () => {
  const user = Data.getStringVariable('user');
  if (user) {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${user}` };
  }
  return { 'Content-Type': 'application/json' };
};
export const UserService = {
  Smoke: async (body: SmokeRequest): Promise<ApiResponse<null>> => {
    const requestOptions = {
      method: 'PUT',
      headers: await header(),
      body: JSON.stringify(body),
    };
    return Fetch(endPoints.smoke, requestOptions);
  },
  GetDailyReport: async (): Promise<ApiResponse<DailyReport>> => {
    const requestOptions = {
      method: 'GET',
      headers: await header(),
    };
    return Fetch(endPoints.daily, requestOptions);
  },
  GetSmokingReport: async (): Promise<ApiResponse<SmokingReport>> => {
    const requestOptions = {
      method: 'GET',
      headers: await header(),
    };
    return Fetch(endPoints.smoke, requestOptions);
  },
};
