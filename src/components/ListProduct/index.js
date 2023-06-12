import React from 'react';
import { Fab } from "@mui/material";
import { withStyles } from '@mui/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles';
import './styles.css';

const ListProduct = (props) => {


    const { classes, product } = props;
    console.log("product", product)
    const isDiscounted = parseFloat(product.discountedPrice) > 0;

    return (
        <div className="max-w-sm overflow-hidden w-11/12 justify-center relative product-card">

            <div className="product-info-block">

                {isDiscounted &&
                    <div className={classes.wasBlockContainer}>
                        <span className={classes.wasBlock}>SALE</span>
                    </div>}

                <img className="w-full" src={require(`../../assets/product_images/${product.thumbnail}`)} alt="Product" />

                <div className="productTextDiv">

                    <div>
                        <span className={`product-card-title ${classes.productTitle}`}>
                            {product.name}
                        </span>
                    </div>

                    <div>
                        <span className={classes.productPrice}>
                            <span className={classNames({
                                [classes.strikeThrough]: isDiscounted
                            })}>£ {product.price}</span>{isDiscounted && <span> | £ {product.discountedPrice}</span>}
                        </span>
                    </div>

                </div>

            </div>

            <Link to={`/product/${product.id}`}>
                <div className={`product-card-link ${classes.addButtonContainer}`}>
                    <Fab color="primary" size="small" className={classes.addButton}>
                        <span className={classes.addButtonText}>View</span>
                    </Fab>
                </div>
            </Link>
        </div>
    );
}



export default withStyles(styles)(ListProduct);
