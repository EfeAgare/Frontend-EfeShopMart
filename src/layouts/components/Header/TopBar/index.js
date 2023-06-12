import React from "react";
import PropTypes from "prop-types";
import { Link, Badge, Hidden } from "@mui/material";
import { withStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import styles from "./styles";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { verifyToken } from "../../../../config/verifyToken";

const links = [
  {
    title: "Daily Deals",
    link: "/"
  },
  {
    title: "Sell",
    link: "/"
  },
  {
    title: "Help & Contact",
    link: "/"
  }
];

class TopBar extends React.Component {
  state = {
    customerName: ""
  };

  componentDidMount() {
    if (verifyToken() !== null) {
      this.setState({
        customerName: verifyToken().name
      });
    }
  }

  render() {
    const {
      classes,
      shoppingCartItems,
      itemsTotalAmount
      //   customerData
    } = this.props;
    console.log("TOP-BAR>>>>", this.props);

    return (
      <AppBar className={classes.topBar}>
        <Toolbar className={classes.toolbar}>
          {verifyToken() === null ? (
            <div className={classes.authText + " " + classes.divTopBar}>
             
              
              <Link
                onClick={() => {
                  this.props.showAuth(false);
                }}
                className={classes.authLink}
                id="btnSignIn"
                style={{ color: "#ffff" }}
              >
                Sign in
              </Link>
              <span className="space-signin">or</span>
              <Link
                onClick={() => {
                  this.props.showAuth(true);
                }}
                className={classes.authLink}
                id="btnRegister"
                style={{ color: "#fff" }}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className={classes.authText + " " + classes.divTopBar}>
              <span>Hi {this.state.customerName}</span>
              <Link className={classes.authLink} style={{ color: "#ffff" }}>
                My Profile
              </Link>
              <span>|</span>
              <Link
                className={classes.authLink}
                id="btnLogout"
                style={{ color: "#ffff" }}
              >
                Logout
              </Link>
            </div>
          )}
          <Hidden mdDown className={classes.divTopBar}>
            <div className={classes.linksContainer}>
              {links.map((item, index) => (
                <Button key={index} classes={{ root: classes.button }}>
                  <Link to={item.link} className={classes.navLink}>
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </Hidden>
          <Hidden mdDown className={classes.divTopBar}>
            <div className={classes.currencyIconContainer}>
              <span className="flag-icon flag-icon-gb" />
            </div>
            <div className={classes.currencyContainer}>
              <div className={classes.currencyText}>GBR</div>
            </div>
          </Hidden>
          <div className={classes.divTopBar}>
            <div
              className={classes.iconContainer}
              id="menuCartLink"
              onClick={() => {
                this.props.showCart();
              }}
            >
              <Badge
                classes={{ badge: classes.badge }}
                badgeContent={shoppingCartItems && shoppingCartItems.length}
                color="primary"
              >
                <AddShoppingCartIcon/>
               
              </Badge>
            </div>
            <div className={classes.yourBag} style={{ color: "black" }}>
              Your Bag:  $<span id="menuCartTotalPrice">{itemsTotalAmount}</span>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}


export default withStyles(styles)(TopBar);
