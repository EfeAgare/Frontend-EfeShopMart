import React from "react";
import {
  InputBase,
  Badge,
  Drawer,
  Hidden,
  IconButton,
  Button,
  Toolbar,
  AppBar
} from "@mui/material";
import { withStyles } from '@mui/styles';
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/icons-material/Menu";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./styles";
import "./style.css";

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

class NavBar extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  componentDidMount() {
    const { cart_id } = localStorage;
    window.addEventListener("scroll", event => {
      const scrollpos = window.scrollY;
      if (scrollpos > 10) {
        this.setState({
          activeClass: "is-scrolled"
        });
      } else {
        this.setState({
          activeClass: "is-ontop"
        });
      }
    });
    // this.props?.getAllDepartments();

    // if (!cart_id) {
    //   this.props?.generateUniqueCart();
    // }
    // this.props?.getCart({ cart_id });
  }

  handleToggleDepartment = e => {
    e.preventDefault();
    const departmentId = parseInt(e.target.id);

    if (
      this.props.location?.pathname !== "/" &&
      this.props.location?.pathname !== `/department/${departmentId}`
    ) {
      this.props.history.push("/");
    } else {
      this.props.history.push(`/department/${departmentId}`);
      this.props.getDepartmentCategories({ department_id: departmentId });
      this.props.getProductsInDepartment({
        department_id: departmentId,
        page: 1
      });
    }
  };

  handleInputChange = e => {
    const search = e.target.value.trim().toLowerCase();
    this.props.searchProducts({
      query_string: search,
      all_words: "on",
      page: 1,
      description_length: 120
    });
  };

  handleShoppingCartOpen = () => {
    this.props.showCart();
    this.props.getCart({ cart_id: localStorage.cart_id });
  };

  render() {
    const { classes, brand, allDepartments, shoppingCartItems } = this.props;
    const brandComponent = (
      <Link to={"/"} className={classes.brand}>
        {brand}
      </Link>
    );

    return (
      <div>
        <AppBar
          className={`mainHeaderHolder ${classes.navBar +
            " " +
            this.state.activeClass}`}
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.flex}>{brandComponent}</div>
            <Hidden mdDown>
              <div
                className={`departments categories ${classes.linksContainer}`}
              >
                {allDepartments?.map((department, index) => (
                  <NavDropdown
                    key={index}
                    id={department.department_id}
                    title={department.name}
                    onClick={this.handleToggleDepartment}
                    className="department navDropdown"
                  ></NavDropdown>
                ))}
              </div>
            </Hidden>
            {this.props?.location?.pathname === "/" ? (
              <Hidden mdDown>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    name="search"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Hidden>
            ) : (
              ""
            )}
            <Hidden mdDown>
              <div
                className={classes.iconContainer}
                onClick={this.handleShoppingCartOpen}
              >
                <Badge
                  classes={{
                    badge: classes.badge
                  }}
                  id="menuCartQuantity"
                  badgeContent={shoppingCartItems?.length}
                  color="primary"
                >
                  <AddShoppingCartIcon/>
                </Badge>
              </div>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle.bind(this)}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={"right"}
              className="py-12"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle.bind(this)}
            >
              <Button
                classes={{
                  root: classes.button
                }}
              >
                <Link to={`/department/1`} className={classes.navDrawerLink}>
                  Regional
                </Link>
              </Button>
            </Drawer>
          </Hidden>
          
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
