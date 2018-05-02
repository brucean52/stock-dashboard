import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(column_1, column_2, column_3, column_4) {
  id += 1;
  return { id, column_1, column_2, column_3, column_4 };
}

// const data = [
//   createData('Previous Close', 159, 'Market Cap', 24),
//   createData('Open', 237, 'Beta', 37),
//   createData("Day's Range", 262, 'P/E Ratio (ttm)', 24),
//   createData('52 Week Range', 305, 'EPS (ttm)', 67),
//   createData("Dividend/Yield", 356, "ex-Dividend Date", 49),
//   createData("Volume", 356, "YTD Change", 49),
//   createData("50 Day Moving Average", 356, "200 Day Moving Average", 49),
//   createData("Short Interest", 356, "Short Ratio", 49),
// ];

const Summary = props => {
    console.log('summary props', props);
    const { classes } = props;
    let stockQuote = '';
    if(props.stockQuote.calculationPrice === "close"){
      stockQuote = props.stockQuote.close;
    } else {
      stockQuote = props.stockQuote.calculationPrice;
    }
    let fiftyTwoWeekRange = '';

    if(props.stockStats.hasOwnProperty('week52low')){
      fiftyTwoWeekRange = props.stockStats.week52low.toString()+' - '+props.stockStats.week52high.toString();
    }

    let dayRange = '';
    if(props.stockQuote.hasOwnProperty('high')){
      dayRange = props.stockQuote.low.toString()+' - '+props.stockQuote.high.toString();
    }
    let data = [
      createData('Previous Close', props.stockQuote.close, 'Market Cap', props.stockQuote.marketCap),
      createData('Open', props.stockQuote.open, 'Beta', props.stockStats.beta),
      createData("Day's Range", dayRange, 'P/E Ratio (ttm)', props.stockQuote.peRatio),
      createData('52 Week Range', fiftyTwoWeekRange, 'EPS (ttm)', props.stockStats.ttmEPS),
      createData("Dividend/Yield", props.stockStats.dividendRate, "ex-Dividend Date", props.stockStats.exDividendDate),
      createData("Volume", props.stockQuote.latestVolume, "YTD Change", props.stockQuote.ytdChange),
      createData("50 Day Moving Average", props.stockStats.day50MovingAvg, "200 Day Moving Average", props.stockStats.day200MovingAvg),
      createData("Short Interest", props.stockStats.shortInterest, "Short Ratio", props.stockStats.shortRatio),
    ];
    return (
        <Paper className={classes.root}>
        <h3>{props.stockQuote.symbol} {stockQuote} {props.stockQuote.change}  ({props.stockQuote.changePercent}%)</h3>
        <h5>{props.stockQuote.companyName}</h5>
        <Table className={classes.table}>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.column_1}</TableCell>
                  <TableCell numeric>{n.column_2}</TableCell>
                  <TableCell numeric>{n.column_3}</TableCell>
                  <TableCell numeric>{n.column_4}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
}

Summary.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state){
    return {
        stockQuote: state.stock.stockQuote,
        stockStats: state.stock.stockStats
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {})
)(Summary);