import axios from 'axios';
import types from './types';

export function getStockTickerResults(input){
    return dispatch => {
        const URL = 'http://search.xignite.com/Search/Suggest?parameter=XigniteGlobalQuotes.GetGlobalDelayedQuote.Identifier&term='
        const response = axios
            .get(URL+input)
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

export function clearStockTickerArray(){
    return {
        type: types.CLEAR_STOCK_ARRAY
    };
}