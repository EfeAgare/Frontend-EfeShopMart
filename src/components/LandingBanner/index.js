import React, { Component } from 'react';
import { Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import styles from "./styles";

class LandingBanner extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper elevation={1} className={classes?.paperContainer} />
        );
    }
}


export default withStyles(styles)(LandingBanner);
