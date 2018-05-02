import React from 'react';
import ChartistGraph from 'react-chartist';
import Paper from 'material-ui/Paper';
import { withStyles } from "material-ui/styles";
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      width: '50%',
      marginTop: theme.spacing.unit * 3,
    },
  });

var data = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, 5, 0, 7, 6, 2]
    ]
  };

  var options = {
    high: 10,
    low: 0,
    showArea: true,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  var type = 'Line';

const Chart = props => {
    console.log('chart props', props);
    const { classes } = props;
    return(
        <Paper className={classes.root}>
            <ChartistGraph data={data} options={options} type={type} /> 
        </Paper>
    );
}

function mapStateToProps(state){
    return {
        stockChart: state.stock.stockChart, 
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {})
)(Chart);