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
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Previous Close', 159, 'Market Cap', 24),
  createData('Open', 237, 'Beta', 37),
  createData("Day's Range", 262, 'P/E Ratio (ttm)', 24),
  createData('52 Week Range', 305, 'EPS (ttm)', 67),
  createData("Dividend/Yield", 356, "ex-Dividend Date", 49),
  createData("Volume", 356, "YTD Change", 49),
  createData("50 Day Moving Average", 356, "200 Day Moving Average", 49),
  createData("Short Interest", 356, "Short Ratio", 49),
];

const Summary = props => {
    console.log('summary props', props);
    const { classes } = props;
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell numeric>{n.calories}</TableCell>
                  <TableCell numeric>{n.fat}</TableCell>
                  <TableCell numeric>{n.carbs}</TableCell>
                  <TableCell numeric>{n.protein}</TableCell>
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