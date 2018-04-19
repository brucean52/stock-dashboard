import types from '../actions/types';

const DEFAULT_STATE = {
    stockSymbol: '',
    stockTickerArray: [],
    stockChart: [],
    stockNews: [],
    stockQuote: {},
    stockStats: {}
}

export default function ( state = DEFAULT_STATE, action){
    switch (action.type) {
        case types.STOCK_TICKER_RESULTS:
            return {...state, stockTickerArray: [...action.payload]};
        case types.CLEAR_STOCK_ARRAY:
            return {...state, stockTickerArray: []};
        case types.GET_STOCK_DATA:
            //console.log('action payload', action.payload);
            return {...state, 
                    stockChart: action.payload.chart, 
                    stockNews: action.payload.news, 
                    stockQuote: action.payload.quote,
                    stockStats: action.payload.stats
                 }
        default:
            return state;
    }
}