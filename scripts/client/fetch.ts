import Data from "@smartface/native/global/data";
import ServiceCall from '@smartface/extension-utils/lib/service-call';

const sc = new ServiceCall({
    baseUrl: 'http://34.68.206.255:3000/api',
    logEnabled: false,
    timeout: 120000,
})
export const Fetch = (url: string, requestOptions: any) => (sc.request(url, requestOptions)
    .then(response => {
        return response;
    })
    .catch(response => {
        if (response.statusCode === 401) {
            Data.removeVariable('user');
            console.log('User removed')

        }
        return false;
    }))

