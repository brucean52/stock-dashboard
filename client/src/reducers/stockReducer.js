import types from '../actions/types';

const DEFAULT_STATE = {
    stockSymbol: '',
    stockTickerArray: []
}

export default function ( state = DEFAULT_STATE, action){
    switch (action.type) {
        case types.STOCK_TICKER_RESULTS:
            return {...state, stockTickerArray: [...action.payload]};
        case types.CLEAR_STOCK_ARRAY:
            return {...state, stockTickerArray: []};
        case types.SET_STOCK_SYMBOL:
            console.log('action payload', action.payload);
            return {...state, stockSymbol: action.payload}
        default:
            return state;
    }
}