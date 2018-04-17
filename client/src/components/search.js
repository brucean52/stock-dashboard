import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
    getStockTickerResults,
    clearStockTickerArray
 } from './../actions/';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

class Search extends Component{
    constructor(props){
        super(props);

        this.state = {
            input: ''
        }
    }

    handleChange = event => {
        this.setState({ input: event.target.value });
        //console.log('event.target.value ',event.target.value);
        if(event.target.value){
            this.props.getStockTickerResults(event.target.value);
        } else {
            this.props.clearStockTickerArray();
        }
        
    };

    render(){
        console.log(this.props);
        const { input } = this.state;
        let tickerList = {};
        if(this.props.stockTickerArr.length > 0 && input !== ''){
            tickerList = this.props.stockTickerArr.map((item, index) => {

                return (
                    <ListItem key={index}>
                        <ListItemText primary={item.Value} secondary={item.Text} />
                    </ListItem>
                );
            });
        } else {
            tickerList = null;
        }
        return(
            <div>
                <FormControl>
                    <InputLabel>Enter Stock Symbol</InputLabel>
                    <Input value={this.state.input} onChange={this.handleChange}/>
                </FormControl>
                <List>
                    {tickerList}
                </List>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        stockTickerArr: state.stock.stockTickerArray
    }
}

export default connect(mapStateToProps, {getStockTickerResults, clearStockTickerArray})(Search);

