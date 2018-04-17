import types from '../actions/types';

const DEFAULT_STATE = {
    stockTickerArray: []
}

export default function ( state = DEFAULT_STATE, action){
    switch (action.type) {
        case types.STOCK_TICKER_RESULTS:
            return {...state, stockTickerArray: [...action.payload]};
        case types.CLEAR_STOCK_ARRAY:
            return{...state, stockTickerArray: []};
        default:
            return state;
    }
}