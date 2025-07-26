import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getRequestAuth, postRequestAuth} from '../../axiosClientAuth';
import {
  CreateSubscription,
  CreateSubscriptionFailure,
  CreateSubscriptionSuccess,
  getSubscriptionPlan,
  getSubscriptionPlanFailure,
  getSubscriptionPlanSuccess,
  PaymentOrder,
  PaymentOrderFailure,
  PaymentOrderSuccess,
  PaymentVerify,
  PaymentVerifySuccess,
  PaymentVerifyFailure,
  subscription_plan,
  subscription_planSuccess,
  subscription_planFailure,
  user_subscription,
  user_subscriptionSuccess,
  user_subscriptionFailure,
  Topup_plan,
  topup_planSuccess,
  topup_planFailure,
  user_topup_plan,
  user_topup_planSuccess,
  user_topup_planFailure,
  Add_user_topup,
  add_user_topupSuccess,
  add_user_topupFailure,
  topup_payment_order,
  topup_payment_orderSuccess,
  topup_payment_orderFailure,
  topup_payment_verify,
  topup_payment_verifySuccess,
  topup_payment_verifyFailure,
  available_coupons,
  available_couponsSuccess,
  available_couponsFailure,
  coupon_validation,
  coupon_validationSuccess,
  coupon_validationFailure,
  payment_history,
  payment_historySuccess,
  payment_historyFailure,
  active_topup,
  active_topupSuccess,
  active_topupFailure,
  invoice_detail,
  invoice_detailSuccess,
  invoice_detailFailure,
  refundMoneyBack,
  refundMoneyBackSuccess,
  refundMoneyBackFail,
  MoneyFeedback,
  MoneyFeedbackSuccess,
  MoneyFeedbackFail,
} from './CreateSubscSlice';
import {ToastHandler} from '../../../utils/utils';

function* CreateSubscriptionApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(`subscription/user_subscription`, action.payload),
    );
    yield put(CreateSubscriptionSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(CreateSubscriptionFailure(error?.response));
  }
}
function* getSubscriptionPlanApi(action) {
  let id = action?.payload?.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`subscription/user_subscription?userid=${id}`, action.payload),
    );
    yield put(getSubscriptionPlanSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(getSubscriptionPlanFailure(error?.response));
  }
}
function* PaymentOrderApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`payment/payment_order`, action.payload));
    yield put(PaymentOrderSuccess(response?.data));
  } catch (error) {
    yield put(PaymentOrderFailure(error?.response));
  }
}
function* PaymentVerifyApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(`payment/payment_verify`, action.payload)
    );
    yield put(PaymentVerifySuccess(response?.data));
  } catch (error) {
    console.error("❌ Payment Verify Error:", error?.response);
    // ToastHandler(false, errorMsg);
    yield put(PaymentVerifyFailure(error?.response));
  }
}
function* subscription_planApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`subscription/subscription_plan`, action.payload),
    );
    yield put(subscription_planSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(subscription_planFailure(error?.response));
  }
}
//get user subscription plan
function* user_subscriptionApi(action) {
  let id = action?.payload?.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`subscription/user_subscription?userid=${id}`, action.payload),
    );
    yield put(user_subscriptionSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(user_subscriptionFailure(error?.response));
  }
}
function* Topup_planApi(action) {
  let id = action?.payload?.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`subscription/topup_plan?userid=${id}`, action.payload),
    );
    yield put(topup_planSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Something Went Wrong');
    yield put(topup_planFailure(error?.response));
  }
}
/// user all topup plan
function* user_topup_planApi(action) {
  let id = action?.payload?.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`subscription/user_topup?userid=${id}`, action.payload),
    );
    yield put(user_topup_planSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Something Went Wrong');
    yield put(user_topup_planFailure(error?.response));
  }
}
function* add_user_topupApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`subscription/user_topup`, action.payload));
    yield put(add_user_topupSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Something Went Wrong');
    yield put(add_user_topupFailure(error?.response));
  }
}
function* topup_payment_orderApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(`payment/user_topup_payment_order`, action.payload),
    );
    yield put(topup_payment_orderSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Something Went Wrong');
    yield put(topup_payment_orderFailure(error?.response));
  }
}
function* topup_payment_verifyApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(`payment/user_topup_payment_verify`, action.payload),
    );
    yield put(topup_payment_verifySuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(topup_payment_verifyFailure(error?.response));
  }
}
//
function* available_couponsApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`referral/available_coupons`, action.payload));
    yield put(available_couponsSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(available_couponsFailure(error?.response));
  }
}
function* coupon_validationApi(action) {
  let coupon_code = action?.payload?.coupon_code;
  let plan_id = action?.payload?.plan_id;
  try {
    const response = yield call(() =>
      getRequestAuth(
        `referral/coupon_validation?coupon_code=${coupon_code}&plan_id=${plan_id}`,
        action.payload,
      ),
    );
    yield put(coupon_validationSuccess(response?.data));
    ToastHandler(true, 'Coupon Applied Successfully');
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(coupon_validationFailure(error?.response));
  }
}
function* payment_historyApi(action) {
  let id = action?.payload?.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`payment/user_payment_history?userid=${id}`, action.payload),
    );
    yield put(payment_historySuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(payment_historyFailure(error?.response));
  }
}
/// active_topup
function* active_topupApi(action) {
  let id = action?.payload?.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`subscription/active_topup?userid=${id}`, action.payload),
    );
    yield put(active_topupSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(active_topupFailure(error?.response));
  }
}
//payment invoice
function* invoice_detailApi(action) {
  let id = action?.payload?.userid;
  let paymentId = action?.payload?.payment_id;
  try {
    const response = yield call(() =>
      getRequestAuth(
        `payment/user_payment_history?userid=${id}&payment_id=${paymentId}`,
        action.payload,
      ),
    );
    yield put(invoice_detailSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(invoice_detailFailure(error?.response));
  }
}
// subscription refund get api
function* refundMoneyBackApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`payment/moneyback/price`, action.payload));
    yield put(refundMoneyBackSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(refundMoneyBackFail(error?.response));
  }
}
// post api for refund
function* MoneyFeedbackApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`payment/moneyback`, action.payload));
    yield put(MoneyFeedbackSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(MoneyFeedbackFail(error?.response));
  }
}

export default function* CreateSubscriptionSaga() {
  yield all([takeLatest(CreateSubscription, CreateSubscriptionApi)]);
  yield all([takeLatest(getSubscriptionPlan, getSubscriptionPlanApi)]);
  yield all([takeLatest(PaymentOrder, PaymentOrderApi)]);
  yield all([takeLatest(PaymentVerify, PaymentVerifyApi)]);
  yield all([takeLatest(subscription_plan, subscription_planApi)]);
  yield all([takeLatest(user_subscription, user_subscriptionApi)]);
  yield all([takeLatest(Topup_plan, Topup_planApi)]);
  yield all([takeLatest(user_topup_plan, user_topup_planApi)]);
  yield all([takeLatest(Add_user_topup, add_user_topupApi)]);
  yield all([takeLatest(topup_payment_order, topup_payment_orderApi)]);
  yield all([takeLatest(topup_payment_verify, topup_payment_verifyApi)]);
  yield all([takeLatest(available_coupons, available_couponsApi)]);
  yield all([takeLatest(coupon_validation, coupon_validationApi)]);
  yield all([takeLatest(payment_history, payment_historyApi)]);
  yield all([takeLatest(active_topup, active_topupApi)]);
  yield all([takeLatest(invoice_detail, invoice_detailApi)]);
  yield all([takeLatest(refundMoneyBack, refundMoneyBackApi)]);
  yield all([takeLatest(MoneyFeedback, MoneyFeedbackApi)]);
}
