import React from 'react';
import {StackActions, CommonActions, DrawerActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigation(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset(...args) {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
export function popToBack(...args) {
  navigationRef.current?.dispatch(StackActions.pop(...args));
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

// export default {
//   navigation,
//   goBack,
//   reset,
//   push,
//   replace,
//   popToTop,
//   toggleDrawer,
//   popToBack,
// };
