import {store} from '../store/store';
import {logout, resetWallet} from '../apis/Onboarding/authenticationSlice';
import toast from 'react-hot-toast';
import {resetPlayerData} from './playerCoins/playerCoinsSlice';

const tokenPromise = new Promise((resolve, reject) => {
  try {
    const refresh = '';
    const access = '';
    if (refresh) {
      resolve(refresh);
    } else if (access) {
      resolve(access);
    } else if (!refresh && !access) {
    }
  } catch (err) {
    reject(err);
  }
});

export function handleException(error) {
  const {response} = error;
  if ([401, 403].includes(error.response.status)) {
    tokenPromise
      .then(token => {
        if (token) {
          toast.error('Session timed out. You were logged out');
          const reqParams = {
            refresh_token: token,
          };
          store.dispatch(resetPlayerData());
          store.dispatch(resetWallet());
          store.dispatch(logout(reqParams));
        }
      })
      .catch(error => {
        console.log({error});
      });
  }
}
