import {RemoveLocallyData} from './DataStorage';

export async function clearLocalStorage() {
  await RemoveLocallyData('accessToken');
  await RemoveLocallyData('activeSymbol');
  await RemoveLocallyData('emailVerified');
  await RemoveLocallyData('selectedCountry');
  await RemoveLocallyData('userId');
  await RemoveLocallyData('segment_Detail');
  await RemoveLocallyData('isverified');
  await RemoveLocallyData('referralcode');
}
