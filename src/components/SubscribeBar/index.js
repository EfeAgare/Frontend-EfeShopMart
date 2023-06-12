import React from "react";
import { InputBase, Fab } from '@mui/material';
import { withStyles } from '@mui/styles';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import styles from './styles';

class SubscribeBar extends React.Component {

    render() {

        const {
            classes
        } = this.props;


        return (
            <div className={classes.subscribeBar}>

                <div className={classes.toolbar}>
                    <div className={classes.mainText}>Subscribe for Shop News, Updates and Special Offers</div>
                    <div style={{ flex: 1, flexGrow: 1 }} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <EmailIcon />
                        </div>
                        <InputBase
                            placeholder="Your Email"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <Fab color="primary" variant="extended"  className={classes.subscribeButton}><span className={classes.subscribeText}>Subscribe</span></Fab>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(SubscribeBar);
