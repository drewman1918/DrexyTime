import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Link to = "/myaccount"><Avatar alt= {`${props.firstname} ${props.lastname}`} src={props.profilepicture} className={classes.avatar} /></Link>
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
        profilepicture: state.userReducer.profilepicture,
        firstname: state.userReducer.firstname,
        lastname: state.userReducer.lastname
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ImageAvatars));
