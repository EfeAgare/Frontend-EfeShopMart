import React, { Component } from 'react';
import { Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import styles from "./styles";

class Banner extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper elevation={1} className={classes?.paperContainer}>
                <div className={classes?.gridItemsContainer}>
                    <div className={classes?.gridTitle}>
                        Converse
                    </div>
                    <div className={classes?.gridSubtitle}>
                        Explore styles tough enough to handle all your workouts
                    </div>
                </div>
            </Paper>
        );
    }
}


export default withStyles(styles)(Banner);
