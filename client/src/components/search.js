import React, { Component } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { 
    getStockTickerResults,
    clearStockTickerArray
 } from './../actions/';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';


const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
  ];
  
  function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }
  
  function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }
  renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  };
  
  function getSuggestions(inputValue) {
    let count = 0;
  
    return suggestions.filter(suggestion => {
      const keep =
        (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
        count < 5;
  
      if (keep) {
        count += 1;
      }
  
      return keep;
    });
  }

class Search extends Component{
    constructor(props){
        super(props);

        this.state = {
            input: '',
            inputValue: '',
            selectedItem: []
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <Downshift>
                {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                <div className={classes.container}>
                    {renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                        placeholder: 'Search a country (start with a)',
                        id: 'integration-downshift-simple',
                    }),
                    })}
                    {isOpen ? (
                    <Paper className={classes.paper} square>
                        {getSuggestions(inputValue).map((suggestion, index) =>
                        renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.label }),
                            highlightedIndex,
                            selectedItem,
                        }),
                        )}
                    </Paper>
                    ) : null}
                </div>
                )}
            </Downshift>
            </div>
        )
      }
    }
    
    Search.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    
    const styles = theme => ({
      root: {
        flexGrow: 1,
        height: 250,
      },
      container: {
        flexGrow: 1,
        position: 'relative',
      },
      paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
      chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
      },
      inputRoot: {
        flexWrap: 'wrap',
      },
    });
    
    Search.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    // handleChange = event => {
    //     this.setState({ input: event.target.value });
    //     //console.log('event.target.value ',event.target.value);
    //     if(event.target.value){
    //         this.props.getStockTickerResults(event.target.value);
    //     } else {
    //         this.props.clearStockTickerArray();
    //     }
        
    // };

    //render(){
        // console.log(this.props);
        // const { input } = this.state;
        // let tickerList = {};
        // if(this.props.stockTickerArr.length > 0 && input !== ''){
        //     tickerList = this.props.stockTickerArr.map((item, index) => {

        //         return (
        //             <ListItem key={index}>
        //                 <ListItemText primary={item.Value} secondary={item.Text} />
        //             </ListItem>
        //         );
        //     });
        // } else {
        //     tickerList = null;
        // }
        // return(
        //     <div>
        //         <FormControl>
        //             <InputLabel>Enter Stock Symbol</InputLabel>
        //             <Input value={this.state.input} onChange={this.handleChange}/>
        //         </FormControl>
        //         <List>
        //             {tickerList}
        //         </List>
        //     </div>
        // );
    //}


function mapStateToProps(state){
    return {
        stockTickerArr: state.stock.stockTickerArray
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {getStockTickerResults, clearStockTickerArray})
)(Search);

