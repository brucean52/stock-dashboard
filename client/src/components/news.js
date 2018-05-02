import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const News = props => {
  const { classes } = props;
  console.log('news props', props);
  let newsCards = props.stockNews.map((item, index)=>{
    //console.log('news item', item);
    return (
      <Card className={classes.card} key={index}>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {item.headline}
        </Typography>
        <Typography component="p">
          {item.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    );
  });
  return (
    <div>
      {newsCards}
    </div>
  );
}

News.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        stockNews: state.stock.stockNews
    }
}

export default compose(
        withStyles(styles),
        connect(mapStateToProps, {})
)(News);