import 'theme';
import router from 'routes';
import { Data } from '@smartface/native/global';

const user = Data.getStringVariable('user');
if(user){
    router.push('/mainTab');
}else{
    router.push('/auth');
}

