import React, { Component } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { 
    getStockTickerResults,
    setStock,
    clearStockTickerArray
 } from './../actions/';

//import Input, { InputLabel } from 'material-ui/Input';
//import { FormControl } from 'material-ui/Form';
//import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
//import keycode from 'keycode';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
//import Chip from 'material-ui/Chip';

class Search extends Component{
    constructor(props){
        super(props);

        this.state = {
            input: '',
            inputValue: '',
            selectedItem: []
        }
    }
    renderInput(inputProps) {
      //console.log('inputProps', inputProps);
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
    
    handleChange = event =>{
        
        //console.log('event.target.value ', event.target.value);
        if(event.target.value){
            this.props.getStockTickerResults(event.target.value);
        } else {
            this.props.clearStockTickerArray();
        }
        this.setState({ input: event.target.value });
    };

    inputChange(symbol){
      //console.log('input changed', symbol);
      this.props.setStock(symbol);
    }

    render() {
        const { classes } = this.props;
        console.log('search props', this.props);
        //console.log('search state', this.state);
        return (
            <div className={classes.root}>
            <Downshift
              onChange={selection => this.inputChange(selection)}
            >
                {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                <div className={classes.container}>
                    {this.renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                        placeholder: 'Enter Stock Symbol',
                        id: 'integration-downshift-simple',
                        onChange: this.handleChange,
                    }),
                    })}
                    {isOpen ? (
                    <Paper className={classes.paper} square>
                        {this.props.stockTickerArr.map((item, index) => {
                            const isHighlighted = highlightedIndex === index;
                            const isSelected = (selectedItem || '').indexOf(item.Value) > -1;

                            return (
                              <MenuItem
                                {...getItemProps({item: item.Value})}
                                key={index}
                                selected={isHighlighted}
                                component="div"
                                style={{
                                  fontWeight: isSelected ? 500 : 400,
                                }}
                              >
                                {item.Value}
                              </MenuItem>
                            );
                          }
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
      highlightedIndex: PropTypes.number,
      index: PropTypes.number,
      itemProps: PropTypes.object,
      selectedItem: PropTypes.string,
      //suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
    };
    
    const styles = theme => ({
      root: {
        flexGrow: 1,
        //height: 250,
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

function mapStateToProps(state){
    return {
        stockTickerArr: state.stock.stockTickerArray,
        stockNews: state.stock.stockNews
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {getStockTickerResults, clearStockTickerArray, setStock})
)(Search);

