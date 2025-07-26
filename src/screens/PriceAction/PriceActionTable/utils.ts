import {Platform} from 'react-native';

export const PricestockTable = {
  tableHead: [
    {
      label: 'Our Screener Results',
      col: 'hi_low_gain_pct', //All
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
      label: 'Vol Greatest Open days',
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
      label: '52w high',
      col: 'fiftytwo_week_high',
      icon: require('../../../assets/images/question.png'),
    },
    {
      label: '52w low',
      col: 'fiftytwo_week_low',
      icon: require('../../../assets/images/question.png'),
    },
  ],
  widthArrsell: [
    Platform.OS === 'ios' ? 250 : 200,
    100,
    100,
    100,
    100,
    107,
    138, //vol greatest open day
    160,
    160,
    73,
    73,
    73,
    73,
    120,
    130,
  ],
};
