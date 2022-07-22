import Data from "@smartface/native/global/data";
import { Fetch } from './fetch';

const baseUrl = 'http://34.68.206.255:3000/api';
const endPoints = {
  login: '/auth/login',
  register: '/auth/register',
};

const header = async () => {
  const user = Data.getStringVariable('user');
  if (user) {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${user}` };
  }
  return { 'Content-Type': 'application/json' };
};
export const AuthService = {
  Login: async (body:UserInfo) : Promise<ApiResponse<string>> => {
    const requestOptions = {
      method: 'POST',
      headers: await header(),
      body: JSON.stringify(body),
    };
    return Fetch(endPoints.login, requestOptions);
  },
  Register: async (body:UserInfo) : Promise<ApiResponse<UserInfo>> => {
    const requestOptions = {
      method: 'POST',
      headers: await header(),
      body: JSON.stringify(body),
    };
    return Fetch(endPoints.register, requestOptions);
  },
};
