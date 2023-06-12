import React from "react";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

const Header = (props) => {

    const {
        classes,
        brand,
        categories
    } = props;

    return (
        <div>
            <TopBar />
            <NavBar classes={classes} brand={brand} categories={categories} />
        </div>
    );
}




export default Header;
