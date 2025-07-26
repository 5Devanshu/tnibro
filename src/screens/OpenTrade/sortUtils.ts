// sortUtils.ts
export const sortAllData = (column, response, sortDirection, setSortedData) => {
  let sortedData = [...response];

  if (column === 'symbol') {
    let sortedData = [...response];
    if (sortDirection === 'asc') {
      sortedData.sort(function (a, b) {
        const date1 = a.symbol_name;
        const date2 = b.symbol_name;
        if (date1 < date2) {
          return -1;
        }
        if (date1 > date2) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedData.sort(function (a, b) {
        const date1 = a.symbol_name;
        const date2 = b.symbol_name;
        if (date1 < date2) {
          return 1;
        }
        if (date1 > date2) {
          return -1;
        }
        return 0;
      });
    }
    setSortedData(sortedData);
  } else if (column === 'date') {
    let sortedData = [...response];
    if (sortDirection === 'asc') {
      sortedData.sort(function (a, b) {
        const date1 = new Date(a.days_ago);
        const date2 = new Date(b.days_ago);
        if (date1 < date2) {
          return -1;
        }
        if (date1 > date2) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedData.sort(function (a, b) {
        const date1 = new Date(a.days_ago);
        const date2 = new Date(b.days_ago);
        if (date1 < date2) {
          return 1;
        }
        if (date1 > date2) {
          return -1;
        }
        return 0;
      });
    }
    setSortedData(sortedData);
  } else if (column === 'signal_price') {
    let sortedData = [...response];
    if (sortDirection === 'asc') {
      sortedData.sort(function (a, b) {
        const price1 = a.recommendation_price;
        const price2 = b.recommendation_price;
        if (price1 < price2) {
          return -1;
        }
        if (price1 > price2) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedData.sort(function (a, b) {
        const price1 = a.recommendation_price;
        const price2 = b.recommendation_price;
        if (price1 < price2) {
          return 1;
        }
        if (price1 > price2) {
          return -1;
        }
        return 0;
      });
    }
    setSortedData(sortedData);
  } else if (column === 'high_price') {
    let sortedData = [...response];
    if (sortDirection === 'asc') {
      sortedData.sort(function (a, b) {
        const highPrice1 = a.max_high_price || a.min_low_price;
        const highPrice2 = b.max_high_price || b.min_low_price;
        if (highPrice1 < highPrice2) {
          return -1;
        }
        if (highPrice1 > highPrice2) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedData.sort(function (a, b) {
        const highPrice1 = a.max_high_price || a.min_low_price;
        const highPrice2 = b.max_high_price || b.min_low_price;
        if (highPrice1 < highPrice2) {
          return 1;
        }
        if (highPrice1 > highPrice2) {
          return -1;
        }
        return 0;
      });
    }
    setSortedData(sortedData);
  } else if (column === 'gain') {
    let sortedData = [...response];
    if (sortDirection === 'asc') {
      sortedData.sort(function (a, b) {
        const gain1 = a.profit_loss_as_per_high_price || a.profit_loss_as_per_low_price;
        const gain2 = b.profit_loss_as_per_high_price || b.profit_loss_as_per_low_price;
        if (gain1 < gain2) {
          return -1;
        }
        if (gain1 > gain2) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedData.sort(function (a, b) {
        const gain1 = a.profit_loss_as_per_high_price || a.profit_loss_as_per_low_price;
        const gain2 = b.profit_loss_as_per_high_price || b.profit_loss_as_per_low_price;
        if (gain1 < gain2) {
          return 1;
        }
        if (gain1 > gain2) {
          return -1;
        }
        return 0;
      });
    }
    setSortedData(sortedData);
  }

  // return sortedData;
};

export const sortingData = [
  {label: 'All', value: 'all'},
  {label: 'Days ago', value: 'date'},
  {label: 'Signal Price', value: 'signal_price'},
  {label: 'High/Low Price', value: 'high_price'},
  {label: 'Gain/Save%', value: 'gain'},
];

export const stockTable = {
  tableHead: [
    {
      label: `Gain`,
      col: 'gain',
    },
    {
      label: 'Signal Price',
      col: 'signal_price',
    },
    {
      label: `High Price`,
      col: 'high_price',
    },
    
    {
      label: `Days ago`,
      col: 'date',
    },
  ],
  widthArr: [110, 110, 100, 120],
};
export const stockTableRedALert = {
  tableHead: [
    {
      label: `Save`,
      col: 'gain',
    },
    {
      label: 'Signal Price',
      col: 'signal_price',
    },
    {
      label: `Low Price`,
      col: 'high_price',
    },
    {
      label: `Days ago`,
      col: 'date',
    },
  ],
  widthArr: [110, 110, 100, 120],
};
export const tableHeaders = [
  'recommendation_price',
  'min_low_price',
  'profit_loss_as_per_low_price',
  'days_ago',
];
// const sortAllData = (column, response, sortDirection) => {
//   if (column === 'date') {
//     let temp = [...response];
//     if (sortDirection === 'asc') {
//       temp.sort(function (a, b) {
//         let date1 = new Date(a.days_ago);
//         let date2 = new Date(b.days_ago);
//         if (date1 < date2) {
//           return -1;
//         }
//         if (date1 > date2) {
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//       temp.sort(function (a, b) {
//         let date1 = new Date(a.days_ago);
//         let date2 = new Date(b.days_ago);
//         if (date1 < date2) {
//           return 1;
//         }
//         if (date1 > date2) {
//           return -1;
//         }
//         return 0;
//       });
//     }
//     setSortedData(temp);
//   } else if (column === 'signal_price') {
//     let temp = [...response];
//     if (sortDirection === 'asc') {
//       temp.sort(function (a, b) {
//         let num1 = a.recommendation_price;
//         let num2 = b.recommendation_price;
//         if (num1 < num2) {
//           return -1;
//         }
//         if (num1 > num2) {
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//       temp.sort(function (a, b) {
//         let num1 = a.recommendation_price;
//         let num2 = b.recommendation_price;
//         if (num1 < num2) {
//           return 1;
//         }
//         if (num1 > num2) {
//           return -1;
//         }
//         return 0;
//       });
//     }
//     setSortedData(temp);
//   } else if (column === 'high_price') {
//     let temp = [...response];
//     if (sortDirection === 'asc') {
//       temp.sort(function (a, b) {
//         let num1 = a.max_high_price;
//         let num2 = b.max_high_price;
//         if (num1 < num2) {
//           return -1;
//         }
//         if (num1 > num2) {
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//       temp.sort(function (a, b) {
//         let num1 = a.max_high_price;
//         let num2 = b.max_high_price;
//         if (num1 < num2) {
//           return 1;
//         }
//         if (num1 > num2) {
//           return -1;
//         }
//         return 0;
//       });
//     }
//     setSortedData(temp);
//   } else if (column === 'gain') {
//     let temp = [...response];
//     if (sortDirection === 'asc') {
//       temp.sort(function (a, b) {
//         let num1 = a.profit_loss_as_per_high_price;
//         let num2 = b.profit_loss_as_per_high_price;
//         if (num1 < num2) {
//           return -1;
//         }
//         if (num1 > num2) {
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//       temp.sort(function (a, b) {
//         let num1 = a.profit_loss_as_per_high_price;
//         let num2 = b.profit_loss_as_per_high_price;
//         if (num1 < num2) {
//           return 1;
//         }
//         if (num1 > num2) {
//           return -1;
//         }
//         return 0;
//       });
//     }
//     setSortedData(temp);
//   }
// };
// sortAllData(data?.value, listOpnedata, sortDirection); /// sorting function
