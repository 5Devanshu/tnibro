import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoading: false,
  isCreateSubscSuccess: '',
  isCreateSubscFail: '',
  isLoadingPlan: false,
  isSubscPlanSuccess: '',
  isSubscPlanFail: '',
  isSubscribed: false, // New state to track subscription status
  isPremiumUser: false,
  isLoadingPaymentOrder: false,
  ispaymentOrderSuccess: '',
  ispaymentOrderFail: '',
  isLoadingPaymentVerify: false,
  isPaymentVerifySuccess: '',
  isPaymentVerifyFail: '',
  //
  isLoadingsubscription_plan: false,
  issubscription_planSuccess: [],
  issubscription_planFail: '',
  //
  isLoadinguser_subs: false,
  isuser_subscriptionSuccess: '',
  isuser_subscriptionFail: '',
  //
  isLoadingtopup_plan: false,
  istopup_planSuccess: [],
  topup_plan_length: '',
  istopup_planFail: '',
  // get user topup plan
  gettopUpLoading: false,
  isLoad: false,
  noDataFound: false,
  getuserTopup: '',
  isuser_topup_planSuccess: {},
  isuser_topup_planFail: '',
  // buy user top
  isadd_user_topupSuccess: '',
  isadd_user_topupFail: '',
  /// buy ordeer
  istopup_payment_orderSuccess: '',
  istopup_payment_orderFail: '',
  //verify payment
  istopup_payment_verifySuccess: '',
  istopup_payment_verifyFail: '',
  //copuns
  isLoads: false,
  isavailable_couponsSuccess: '',
  isavailable_couponsFail: '',
  isloading: false,
  iscoupon_validationSuccess: '',
  iscoupon_validationFail: '',
  //payment history
  ishistoryload: false,
  ispayment_historySuccess: '',
  ispayment_historyFail: '',
  // ALERT TOPUP
  istopupload: false,
  isactive_topupSuccess: '',
  isactive_topupFail: '',
  // invoice detail
  isinvoiceload: false,
  isinvoiceSuccess: '',
  isinvoiceFail: '',
  ///refund
  refundMoneyloading: '',
  refundMoneySuccess: '',
  refundMoneyFail: '',
  ///post sendfeedback
  isMoneyFeedbackLoading: false,
  isMoneyFeedbackSuccess: '',
  isMoneyFeedbackFail: '',
  // Plan Code based Feature enable / disable
  active_PlanCode : '',
  // active_plan_balance : ''
};

const CreateSubscSlice = createSlice({
  name: 'CreateSubscSlice',
  initialState,
  reducers: {
    //// create subscription
    CreateSubscription(state, action) {
      state.isLoading = true;
      state.isCreateSubscSuccess = '';
      state.isCreateSubscFail = '';
    },
    CreateSubscriptionSuccess(state, action) {
      state.isLoading = false;
      state.isCreateSubscSuccess = action?.payload;
      state.isCreateSubscFail = '';
    },
    CreateSubscriptionFailure(state, action) {
      state.isLoading = false;
      state.isCreateSubscSuccess = '';
      state.isCreateSubscFail = action?.payload?.data;
    },
    //Getting the subscription plan

    getSubscriptionPlan(state, action) {
      state.isLoadingPlan = true;
      state.isSubscPlanSuccess = '';
      state.isSubscPlanFail = '';
    },
    getSubscriptionPlanSuccess(state, action) {
      state.isLoadingPlan = false;
      state.isSubscPlanSuccess = action?.payload;
      state.isSubscPlanFail = '';
      state.isSubscribed = action?.payload?.response?.active || action?.payload?.response?.isTrial; // Set subscription status to false on failure
      state.isPremiumUser = action?.payload?.response?.active; // Set subscription status to false on failure
      state.active_PlanCode = action?.payload?.response?.active_PlanCode;
      AsyncStorage.setItem('active_PlanCode',action?.payload?.response?.active_PlanCode);
      // state.active_plan_balance = action?.payload?.response?.active_plan_balance
    },
    getSubscriptionPlanFailure(state, action) {
      state.isLoadingPlan = false;
      state.isSubscPlanSuccess = '';
      state.isSubscPlanFail = action?.payload?.data;
      state.isSubscribed = false; // Set subscription status to false on failure
      state.isPremiumUser = false;
      state.active_PlanCode = '';
      // state.active_plan_balance = ''; 
    },
    resetSubscriptionStatus(state) {
      state.isSubscribed = false; // Add a way to reset the subscription status if needed
    },
    //payment_order
    PaymentOrder(state, action) {
      state.isLoading = true;
      state.ispaymentOrderSuccess = '';
      state.ispaymentOrderFail = '';
    },
    PaymentOrderSuccess(state, action) {
      state.isLoading = false;
      state.ispaymentOrderSuccess = action?.payload;
      state.ispaymentOrderFail = '';
    },
    PaymentOrderFailure(state, action) {
      state.isLoading = false;
      state.ispaymentOrderSuccess = '';
      state.ispaymentOrderFail = action?.payload?.data;
    },
    /////PaymentVerify
    PaymentVerify(state, action) {
      state.isLoadingPaymentVerify = true;
      state.isPaymentVerifySuccess = '';
      state.isPaymentVerifyFail = '';
    },
    PaymentVerifySuccess(state, action) {
      state.isLoadingPaymentVerify = false;
      state.isPaymentVerifySuccess = action?.payload;
      state.isPaymentVerifyFail = '';
    },
    PaymentVerifyFailure(state, action) {
      state.isLoadingPaymentVerify = false;
      state.isPaymentVerifySuccess = '';
      state.isPaymentVerifyFail = action?.payload?.data;
    },
    /////subscription/subscription_plan
    subscription_plan(state) {
      state.isLoadingsubscription_plan = true;
      state.issubscription_planSuccess = [];
      state.issubscription_planFail = '';
    },
    subscription_planSuccess(state, action) {
      state.isLoadingsubscription_plan = false;
      state.issubscription_planSuccess = action?.payload;
      state.issubscription_planFail = '';
    },
    subscription_planFailure(state, action) {
      state.isLoadingsubscription_plan = false;
      state.issubscription_planSuccess = '';
      state.issubscription_planFail = action?.payload?.data;
    },
    //// get user subscription plan detail
    user_subscription(state, _) {
      state.isLoadinguser_subs = true;
      state.isuser_subscriptionSuccess = '';
      state.isuser_subscriptionFail = '';
    },
    user_subscriptionSuccess(state, action) {
      state.isLoadinguser_subs = false;
      state.isuser_subscriptionSuccess = action?.payload;
      state.isuser_subscriptionFail = '';
    },
    user_subscriptionFailure(state, action) {
      state.isLoadinguser_subs = false;
      state.isuser_subscriptionSuccess = '';
      state.isuser_subscriptionFail = action?.payload?.data;
    },

    /// get all topup plan for admin
    Topup_plan(state, _) {
      state.isLoadingtopup_plan = true;
      state.istopup_planSuccess = [];
      state.topup_plan_length = '';
      state.istopup_planFail = '';
    },
    topup_planSuccess(state, action) {
      state.isLoadingtopup_plan = false;
      state.istopup_planSuccess = action?.payload;
      state.topup_plan_length = action?.payload?.response.length;
      state.istopup_planFail = '';
    },
    topup_planFailure(state, action) {
      state.isLoadingtopup_plan = false;
      state.istopup_planSuccess = '';
      state.topup_plan_length = '';
      state.istopup_planFail = action?.payload?.data;
    },

    ////  paticular topup plan of user
    user_topup_plan(state, _) {
      state.gettopUpLoading = true;
      state.isuser_topup_planSuccess = {};
      state.getuserTopup = ''; ///new one
      state.isuser_topup_planFail = '';
    },
    user_topup_planSuccess(state, action) {
      state.gettopUpLoading = false;
      state.isuser_topup_planSuccess = action?.payload;
      state.getuserTopup = action.payload; ///new one
      state.isuser_topup_planFail = '';
    },
    user_topup_planFailure(state, action) {
      state.gettopUpLoading = false;
      state.isuser_topup_planSuccess = '';
      state.isuser_topup_planFail = action?.payload?.data;
    },
    //  buy topup plan
    Add_user_topup(state, _) {
      state.isLoad = true;
      state.isadd_user_topupSuccess = '';
      state.isadd_user_topupFail = '';
    },
    add_user_topupSuccess(state, action) {
      state.isLoad = false;
      state.isadd_user_topupSuccess = action?.payload;
      state.isadd_user_topupFail = '';
    },
    add_user_topupFailure(state, action) {
      state.isLoad = false;
      state.isadd_user_topupSuccess = '';
      state.isadd_user_topupFail = action?.payload?.data;
    },
    /// topup place order
    topup_payment_order(state, _) {
      state.isLoad = true;
      state.istopup_payment_orderSuccess = '';
      state.istopup_payment_orderFail = '';
    },
    topup_payment_orderSuccess(state, action) {
      state.isLoad = false;
      state.istopup_payment_orderSuccess = action?.payload;
      state.istopup_payment_orderFail = '';
    },
    topup_payment_orderFailure(state, action) {
      state.isLoad = false;
      state.istopup_payment_orderSuccess = '';
      state.istopup_payment_orderFail = action?.payload?.data;
    },
    // verify topup plan
    topup_payment_verify(state, _) {
      state.isLoad = true;
      state.istopup_payment_verifySuccess = '';
      state.istopup_payment_verifyFail = '';
    },
    topup_payment_verifySuccess(state, action) {
      state.isLoad = false;
      state.istopup_payment_verifySuccess = action?.payload;
      state.istopup_payment_verifyFail = '';
    },
    topup_payment_verifyFailure(state, action) {
      state.isLoad = false;
      state.istopup_payment_verifySuccess = '';
      state.istopup_payment_verifyFail = action?.payload?.data;
    },
    ///// all coupon
    available_coupons(state, _) {
      state.isLoads = true;
      state.isavailable_couponsSuccess = '';
      state.isavailable_couponsFail = '';
    },
    available_couponsSuccess(state, action) {
      state.isLoads = false;
      state.isavailable_couponsSuccess = action?.payload;
      state.isavailable_couponsFail = '';
    },
    available_couponsFailure(state, action) {
      state.isLoads = false;
      state.isavailable_couponsSuccess = '';
      state.isavailable_couponsFail = action?.payload?.data;
    },
    //coupon_validation
    coupon_validation(state, _) {
      state.isloading = true;
      state.iscoupon_validationSuccess = '';
      state.iscoupon_validationFail = '';
    },
    coupon_validationSuccess(state, action) {
      state.isloading = false;
      state.iscoupon_validationSuccess = action?.payload;
      state.iscoupon_validationFail = '';
    },
    coupon_validationFailure(state, action) {
      state.isloading = false;
      state.iscoupon_validationSuccess = '';
      state.iscoupon_validationFail = action?.payload?.data;
    },
    resetCoupon(state) {
      state.isLoads = false;
      state.isavailable_couponsSuccess = '';
      state.isavailable_couponsFail = '';
      state.isloading = false;
      state.iscoupon_validationSuccess = '';
      state.iscoupon_validationFail = '';
    },
    resetSubscriptionState(state) {
      // state.isLoadingPlan = false;
      // state.isSubscPlanSuccess = '';
      // state.isSubscPlanFail = '';
      state.isLoading = false;
      state.ispaymentOrderSuccess = '';
      state.ispaymentOrderFail = '';
      state.isCreateSubscSuccess = '';
      state.isCreateSubscFail = '';
      state.isLoadingPaymentVerify = false;
      state.isPaymentVerifySuccess = '';
      state.isPaymentVerifyFail = '';
    },
    resetTopup(state) {
      state.isLoad = false;
      state.istopup_payment_verifySuccess = '';
      state.istopup_payment_verifyFail = '';
      state.isLoad = false;
      state.istopup_payment_orderSuccess = '';
      state.istopup_payment_orderFail = '';
      state.isadd_user_topupSuccess = '';
      state.isadd_user_topupFail = '';
      state.gettopUpLoading = false;
      state.isuser_topup_planSuccess = {};
      state.getuserTopup = ''; ///new one
      state.isuser_topup_planFail = '';
    },
    // user_payment_history?userid=
    payment_history(state, _) {
      state.ishistoryload = true;
      state.ispayment_historySuccess = '';
      state.ispayment_historyFail = '';
    },
    payment_historySuccess(state, action) {
      state.ishistoryload = false;
      state.ispayment_historySuccess = action?.payload;
      state.ispayment_historyFail = '';
    },
    payment_historyFailure(state, action) {
      state.ishistoryload = false;
      state.ispayment_historySuccess = '';
      state.ispayment_historyFail = action?.payload?.data;
    },
    // active_topup
    active_topup(state, _) {
      state.istopupload = true;
      state.isactive_topupSuccess = '';
      state.isactive_topupFail = '';
    },
    active_topupSuccess(state, action) {
      state.istopupload = false;
      state.isactive_topupSuccess = action?.payload;
      state.isactive_topupFail = '';
    },
    active_topupFailure(state, action) {
      state.istopupload = false;
      state.isactive_topupSuccess = '';
      state.isactive_topupFail = action?.payload?.data;
    },
    /// invoice detail
    invoice_detail(state, _) {
      state.isinvoiceload = true;
      state.isinvoiceSuccess = '';
      state.isinvoiceFail = '';
    },
    invoice_detailSuccess(state, action) {
      state.isinvoiceload = false;
      state.isinvoiceSuccess = action?.payload;
      state.isinvoiceFail = '';
    },
    invoice_detailFailure(state, action) {
      state.isinvoiceload = false;
      state.isinvoiceSuccess = '';
      state.isinvoiceFail = action?.payload?.data;
    },
    /// get refund Detail
    refundMoneyBack(state) {
      state.refundMoneyloading = true;
      state.refundMoneySuccess = '';
      state.refundMoneyFail = '';
    },
    refundMoneyBackSuccess(state, action) {
      state.refundMoneyloading = false;
      state.refundMoneySuccess = action?.payload?.response;
      state.refundMoneyFail = '';
    },
    refundMoneyBackFail(state, action) {
      state.refundMoneyloading = false;
      state.refundMoneySuccess = '';
      state.refundMoneyFail = action?.payload?.data;
    },
    MoneyFeedback(state) {
      state.isMoneyFeedbackLoading = true;
      state.isMoneyFeedbackSuccess = '';
      state.isMoneyFeedbackFail = '';
    },
    MoneyFeedbackSuccess(state, action) {
      state.isMoneyFeedbackLoading = false;
      state.isMoneyFeedbackSuccess = action?.payload;
      state.isMoneyFeedbackFail = '';
    },
    MoneyFeedbackFail(state, action) {
      state.isMoneyFeedbackLoading = false;
      state.isMoneyFeedbackSuccess = '';
      state.isMoneyFeedbackFail = action?.payload?.data;
    },
    resetRefund(state) {
      state.refundMoneyloading = false;
      state.refundMoneySuccess = '';
      state.refundMoneyFail = '';
      state.isMoneyFeedbackLoading = false;
      state.isMoneyFeedbackSuccess = '';
      state.isMoneyFeedbackFail = '';
    },
  },
});

export const {
  CreateSubscription,
  CreateSubscriptionSuccess,
  CreateSubscriptionFailure,
  getSubscriptionPlan,
  getSubscriptionPlanSuccess,
  getSubscriptionPlanFailure,
  PaymentOrder,
  PaymentOrderSuccess,
  PaymentOrderFailure,
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
  resetCoupon,
  resetSubscriptionState,
  resetTopup,
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
  resetRefund,
} = CreateSubscSlice.actions;

export default CreateSubscSlice.reducer;
