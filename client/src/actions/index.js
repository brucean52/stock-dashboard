import axios from 'axios';
import types from './types';

export function getStockTickerResults(input){
    return dispatch => {
        const URL = 'http://search.xignite.com/Search/Suggest?parameter=XigniteGlobalQuotes.GetGlobalDelayedQuote.Identifier&term='
        axios.get(URL+input)
          .then(resp => {
            dispatch({
              type: types.STOCK_TICKER_RESULTS,
              payload: resp.data.Results
            });
          })
          .catch(err => {
            dispatch({
              type: types.AXIOS_ERROR,
              msg: 'Failed to get stock ticker results:' + err
            });
          });
      };
}

export function setStock(symbol){
  return dispatch => {
    const URL = 'https://api.iextrading.com/1.0/stock/'+symbol+'/batch?types=quote,news,stats,chart&range=1m&last=10';
    axios.get(URL)
      .then(resp => {
        dispatch({
          type: types.GET_STOCK_DATA,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to get stock data results:' + err
        });
      });
  };
}

export function clearStockTickerArray(){
    return {
        type: types.CLEAR_STOCK_ARRAY
    };
}