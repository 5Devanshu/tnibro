import moment from 'moment';

export const candlestick_patterns_arr = [
  {id: 0, label: 'select any', value: 'all'},
  {id: 1, label: 'Three Outside Up', value: 'Three Outside Up'},
  {id: 2, label: 'Three Outside Down', value: 'Three Outside Down'},
  {id: 3, label: 'Hammer', value: 'Hammer'},
  {id: 4, label: 'Inverted Hammer', value: 'Inverted Hammer'},
  {id: 5, label: 'Bullish Engulfing', value: 'Bullish Engulfing'},
  {id: 6, label: 'Bearish Engulfing', value: 'Bearish Engulfing'},
  {id: 7, label: 'Bullish Harami', value: 'Bullish Harami'},
  {id: 8, label: 'Bearish Harami', value: 'Bearish Harami'},
  {id: 9, label: 'Hanging Man', value: 'Hanging Man'},
  {id: 10, label: 'Morning Star', value: 'Morning Star'},
  {id: 11, label: 'Gravestone Doji', value: 'Gravestone Doji'},
  {id: 12, label: 'Dragonfly Doji', value: 'DragonFly Doji'},
  {id: 13, label: 'Doji', value: 'Doji'},
  {id: 14, label: 'Shooting Star', value: 'Shooting Star'},
  {id: 15, label: 'Dark Cloud Cover', value: 'Dark Cloud Cover'},
  {id: 16, label: 'Bullish', value: 'Bullish'},
  {id: 17, label: 'Bearish', value: 'Bearish'},

  // {id: 27, label: 'abandoned baby bullish', value: 'abandoned baby bullish'},
  // {id: 30, label: 'bearish doji', value: 'bearish doji'},
  // {id: 29, label: 'belt hold bullish', value: 'belt hold bullish'},
  // {id: 31, label: 'bullish doji', value: 'bullish doji'},
  // {id: 28, label: 'bullish doji star pattern', value: 'bullish doji star pattern'}, // not in new list
  // {id: 18, label: 'darkcloud ever pattern', value: 'darkcloud ever pattern'},
  // {id: 21, label: 'deliberation bearish', value: 'deliberation bearish'},
  // {id: 14, label: 'dojistar', value: 'dojistar'}, // not in new list
  // {id: 20, label: 'down', value: 'down'}, // not in new list
  // {id: 3, label: 'engulfing_bearish', value: 'engulfing_bearish'},
  // {id: 4, label: 'engulfing_bullish', value: 'engulfing_bullish'},
  // {id: 24, label: 'falling three method', value: 'falling three method'},
  // {id: 5, label: 'harami bearish', value: 'harami bearish'},
  // {id: 6, label: 'harami bullish', value: 'harami bullish'},
  // {id: 9, label: 'morning star doji', value: 'morning star doji'},
  // {id: 15, label: 'piercing pattern', value: 'piercing pattern'},
  // {id: 16, label: 'raindrop pattern', value: 'raindrop pattern'}, // not in new list
  // {id: 26, label: 'tri-star bullish', value: 'tri-star bullish'}, // not in new list
  // {id: 23, label: 'three inside down', value: 'three inside down'},
  // {id: 19, label: 'up', value: 'up'}, // not in new list
  // {id: 22, label: 'upside gap method', value: 'upside gap method'}, // not in new list
];

export const operatorsArray = [
  {id: 6, value: '', label: ''},
  {id: 1, value: 'gt', label: '>'},
  {id: 2, value: 'lt', label: '<'},
  {id: 3, value: 'gte', label: '>='},
  {id: 4, value: 'lte', label: '<='},
  {id: 5, value: 'eq', label: '='},
];

export const tableHeaders = [
  'previous_recommendation',
  'recommendation',
  'previous_recommendation',
  'close',
  'pChange',
  'pvolumeChange',
  'week_volume_compare',
  'week_volume_compare',
  'volume_greatest',
  'completed_pattern',
  'emerging_pattern',
  'open',
  'high',
  'low',
  'close',
  'year_high',
  'year_low',
];
export const tableHeaderWatchlist = [
  'recommended',
  'recommended',
  'close',
  'pChange',
  'pvolumeChange',
  'week_volume_compare',
  'week_volume_compare',
  'volume_greatest',
  'previous_pattern',
  'pattern',
  'open',
  'high',
  'low',
  'close',
  'year_high',
  'year_low',
];

export const stockTableWatchlist = {
  tableHead: [
    {
      label: 'Screener',
      col: 'All',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'High/low % gain',
      col: 'hi_low_gain_pct',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Current Price',
      col: 'curr_price',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Price%Change',
      col: 'price_pct_change',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Volume %',
      col: 'vol_pct',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '7d Avg Vol %',
      col: 'seven_days_vol_total',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '10d Avg Vol %',
      col: 'seven_days_avg_vol',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Vol Greatest',
      col: 'vol_greatest_open',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Previous Candlestick pattern',
      col: 'prev_candlestick',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Current Candlestick pattern',
      col: 'curr_candlestick',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Open',
      col: 'open',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'High',
      col: 'high',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Low',
      col: 'low',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Close',
      col: 'close',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '52 weeks high',
      col: 'fiftytwo_week_high',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '52 weeks low',
      col: 'fiftytwo_week_low',
      icon: require('../../../assets/images/question.png'),
    },
  ],
  // widthArr: [140, 100, 120, 140, 120, 140, 140, 120, 200, 200, 150, 80, 80, 80, 190, 190],
  widthArr: [100, 100, 0, 88, 85, 100, 107, 138, 166, 160, 73, 73, 73, 73, 180, 180],
};

export const stockTable = {
  tableHead: [
    {
      label: 'Our Screener Results',
      col: 'hi_low_gain_pct', //All
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: `Current status`,
      col: 'today_call',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'High/low % gain',
      col: 'hi_low_gain_pct',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Current Price',
      col: 'curr_price',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '% Change',
      col: 'price_pct_change',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Volume %',
      col: 'vol_pct',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '7d Avg Vol %',
      col: 'seven_days_vol_total',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '10d Avg Vol %',
      col: 'seven_days_avg_vol',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Vol Greatest',
      col: 'vol_greatest_open',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Previous Candlestick pattern',
      col: 'prev_candlestick',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Current Candlestick pattern',
      col: 'curr_candlestick',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Open',
      col: 'open',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'High',
      col: 'high',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Low',
      col: 'low',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: 'Close',
      col: 'close',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '52 weeks high',
      col: 'fiftytwo_week_high',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '52 weeks low',
      col: 'fiftytwo_week_low',
      icon: require('../../../assets/images/question.png'),
    },
  ],
  // widthArr: [140, 100, 120, 140, 120, 140, 140, 120, 200, 200, 150, 80, 80, 80, 190, 190],
  widthArr: [250, 90, 0, 0, 100, 85, 100, 107, 138, 166, 160, 73, 73, 73, 73, 120, 130],
  widthArrsell: [250, 0, 0, 0, 100, 85, 100, 107, 138, 166, 160, 73, 73, 73, 73, 120, 130],
};

export function formatDate(date: string): string {
  return moment(date).format('MMM D,YYYY');
}

export function formatDate_InNumber(date: string): string {
  return moment(date).format('DD-MM-YYYY');
}
export function formatDate_InNum24(date: string): string {
  return moment(date).format('DD-MM-YY');
}

export function formatTimeIn12Hour(time: string): string {
  return moment(time).format('h:mm A');
}
export const SuggestiondataWatchlist = [
  {
    id: 1,
    address: `Recommended price by our algorithm. It's a price on which you should either buy / sell the stock or wait for the candle to close. Never jump on any trade and wait for it to come down again.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 2,
    address: `High / Low made after our recommendation by our algorithm.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 3,
    address: `Current market price. Market price shown in this list is appearing late by a couple of mins.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 4,
    address: `This is the difference between yesterday's closing price and current market price. Its shows gain / loss since the previous day of trading closing.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 5,
    address: `It shows total today’s volume and also shows how much in percentage of either gain or loss since yesterday. It is helpful to understand the demand.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 6,
    address: `IIt shows total today’s volume and also shows how much in percentage of either gain or loss last 7 days (including today). It is helpful to understand the gaining or decline in demand of stock.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 7,
    address: `It shows total today’s volume and also shows how much in percentage of either gain or loss last 10 days (including today). It is helpful to understand the gaining or decline in demand of stock.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 8,
    address: `This shows that today volume has crossed high volume of past specific no of days. 
    \n For Example If today volume is 1lac and showing 45 days ago (below), it means todays volume is the highest volume in past 45 days.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 9,
    address: `This is the candlestick pattern closed yesterday. Results may vary based on research. Do your own research before you take any decision.`,
    link: 'Click here for video tutorial',
  },

  {
    id: 10,
    address: `This is the current (today’s) candlestick pattern. Results may vary based on research. Do your own research before you take any decision.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 11,
    address: `This is the price where the stock was open today.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 12,
    address: `This is the today’s highest price where stock price reached after market open.`,
    link: 'Click here for video tutorial',
  },
  {id: 13, address: `This is the today’s lowest price.`, link: 'Click here for video tutorial'},
  {id: 14, address: 'Prev closed data.', link: 'Click here for video tutorial'},
  {
    id: 15,
    address: `It shows a 52 week high price with remaining percentage from the current price and showing the number of days ago when the 52 week high was made.
    \n You can see a dropdown with a search field in the column. By using this drop down you can increase or reduce the no of days to reduce the search.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 16,
    address: `It shows a 52 week high price with remaining percentage from the current price and showing the number of days ago when the 52 week high was made.
    \n You can see a dropdown with a search field in the column. By using this drop down you can increase or reduce the no of days to reduce the search.`,
    link: 'Click here for video tutorial',
  },
];
export const Suggestiondata = [
  {
    id: 0,
    address: `Screener Green Signal Price – This is the price generated by our screener. 
    \n Stop-Loss - If you buy any stock at Green Signal Price then you should put a stop loss as per your own risk management. We are providing stop loss on 3% calculation. If the price is closing (end of day) above the Green Signal Price. You should either continue with Stop Loss or Book Profit / Loss or Put Red Alert (use the bell icon below the stock symbol name on the left). 
    \n Green Signal Date – This is the date when we provide you the green signal price. 
    \n High After Green Signal – This is a high price made after our green signal price is given.
    \n Maximum Profit – This is calculated based on the difference between Green Signal Price and High Price.
    \n Before you take entry please do your own research and take advice from your financial advisor. (For Research & educational Purpose only).`,
    link: 'Click here for video tutorial',
    //all
  },
  {
    id: 1,
    address: `Current status`,
    link: 'Click here for video tutorial',
  },

  {
    id: 2,
    address: `High / Low made after our recommendation by our algorithm.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 3,
    address: `Current market price. Market price shown in this list is appearing late by a couple of mins.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 4,
    address: `This is the difference between yesterday's closing price and current market price. Its shows gain / loss since the previous day of trading closing.    `,
    link: 'Click here for video tutorial',
  },
  {
    id: 5,
    address: `It shows total today’s volume and also shows how much in percentage of either gain or loss since yesterday. It is helpful to understand the demand.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 6,
    address: `It shows total today’s volume and also shows how much in percentage of either gain or loss last 7 days (including today). It is helpful to understand the gaining or decline in demand of stock.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 7,
    address: `It shows total today’s volume and also shows how much in percentage of either gain or loss last 10 days (including today). It is helpful to understand the gaining or decline in demand of stock.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 8,
    address: `This shows that today volume has crossed high volume of past specific no of days. 
    \n For Example If today volume is 1lac and showing 45 days ago (below), it means todays volume is the highest volume in past 45 days.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 9,
    address: `This is the candlestick pattern closed yesterday. Results may vary based on research. Do your own research before you take any decision.`,
    link: 'Click here for video tutorial',
  },

  {
    id: 10,
    address: `This is the current (today’s) candlestick pattern. Results may vary based on research. Do your own research before you take any decision.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 11,
    address: `This is the price where the stock was open today.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 12,
    address: `This is the today’s highest price where stock price reached after market open.`,
    link: 'Click here for video tutorial',
  },
  {id: 13, address: `This is the today’s lowest price.`, link: 'Click here for video tutorial'},
  {id: 14, address: 'Prev closed data.', link: ' Click here for video tutorial'},
  {
    id: 15,
    address: `It shows a 52 week high price with remaining percentage from the current price and showing the number of days ago when the 52 week high was made.
    \n You can see a dropdown with a search field in the column. By using this drop down you can increase or reduce the no of days to reduce the search.`,
    link: 'Click here for video tutorial',
  },
  {
    id: 16,
    address: `It shows a 52 week high price with remaining percentage from the current price and showing the number of days ago when the 52 week high was made.
    \n You can see a dropdown with a search field in the column. By using this drop down you can increase or reduce the no of days to reduce the search.`,
    link: 'Click here for video tutorial',
  },
];
