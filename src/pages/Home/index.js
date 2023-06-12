import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Paper,
  Radio,
  Checkbox,
  Button,
  Fab,
  TextField,
  Link,
  Slider
} from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import Close from "@mui/icons-material/Close";
import styles from "./styles";
import { withStyles } from '@mui/styles';
import { Container, Section } from "../../components/Layout";
import ListProduct from "../../components/ListProduct";
import Banner from "../../components/Banner";
import SubscribeBar from "../../components/SubscribeBar";
import "./styles.css";
import { NetworkStatus, useLazyQuery, useQuery } from "@apollo/client";
import { FETCH_ALL_PRODUCTS } from "../../graphql/query/product/fetchAllProduct";
import { FETCH_ALL_ATTRIBUTES } from "../../graphql/query/attribute/fetchAllAttributes";
import { FETCH_ALL_CATEGORIES } from "../../graphql/query/category/fetchAllCategories";
import LandingBanner from "../../components/LandingBanner";
import { FETCH_ALL_ATTRIBUTE_VALUE } from "../../graphql/query/attribute/fetchAllAttributeValue";
import { FETCH_PRODUCTS_IN_CATEGORY } from "../../graphql/query/category/fetchProductsInCategory";
import { FETCH_PRODUCTS_IN_DEPARTMENT } from "../../graphql/query/department/fetchProductsInDepartment";
import { PRODUCT_SEARCH } from "../../graphql/query/product/productSearch";
import LoadingAnimations from "../../components/Animation/loading";

const initialState = {
  currentProducts: [],
  productCount: 0,
  currentCategories: [],
  totalPages: 0,
  searchCount: 0,
  departmentId: null,
  categoryId: null,

  attributeValues: [],
  attributes: []
};

const minPrice = 10;


const Home = (props) => {
  const [stateProds, setStateProds] = useState(initialState)
  const [search, setSearch] = useState('')
  const [searchProduct, setSearchProduct] = useState(false)
  const [selected, setSelected] = useState(0)
  const [price, setPrice] = React.useState([20, 500]);
  
  const { data: fetchAllProducts, loading, error, fetchMore: fetchMoreAllProducts, refetch, networkStatus } = useQuery(FETCH_ALL_PRODUCTS, {
    variables: {
      page: 1 + selected,
      perPage: 20
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: fetchAllCategories, loading: loadingCategories, error: errorCategories, refetch: refetchAllCategories } = useQuery(FETCH_ALL_CATEGORIES);

  const { data: fetchAllAttributes, loading: loadingAttribute, error: errorAttribute } = useQuery(FETCH_ALL_ATTRIBUTES);

  const { data: fetchAllAttributeValues, loading: loadingAttributeValue, error: errorAttributeValue } = useQuery(FETCH_ALL_ATTRIBUTE_VALUE);

  const [fetchProductsInCategory, { data: productsInCategory, loading: loadingProductsInCategory, error: errorProductsInCategory }] = useLazyQuery(FETCH_PRODUCTS_IN_CATEGORY);

  const [fetchProductsInDepartment, { data: productsInDepartment, loading: loadingProductsInDepartment, error: errorProductsInDepartment }] = useLazyQuery(FETCH_PRODUCTS_IN_DEPARTMENT);

  const [searchProducts, { data: productSearch, loading: loadingProductSearch, error: errorProductSearch }] = useLazyQuery(PRODUCT_SEARCH);

  useEffect(() => {

    if (!!fetchAllProducts && fetchAllProducts?.fetchAllProducts && !searchProduct) {

      setStateProds(s => ({
        ...s,
        productCount: fetchAllProducts.fetchAllProducts?.count,
        currentProducts: fetchAllProducts.fetchAllProducts?.products,
        totalPages: fetchAllProducts.fetchAllProducts?.totalPages
      }));
    }

    if (!!fetchAllCategories && fetchAllCategories?.fetchAllCategories) {
      setStateProds(s => ({
        ...s,
        currentCategories: fetchAllCategories?.fetchAllCategories,
      }));
    }

    if (!!fetchAllAttributes && fetchAllAttributes?.fetchAllAttributes) {

      setStateProds(s => ({
        ...s,
        attributes: fetchAllAttributes?.fetchAllAttributes,
      }));
    }

    if (!!fetchAllAttributeValues && fetchAllAttributeValues?.fetchAllAttributeValues) {

      setStateProds(s => ({
        ...s,
        attributeValues: fetchAllAttributeValues?.fetchAllAttributeValues,
      }));
    }

    if (!!productsInCategory && productsInCategory?.fetchProductsInCategory) {

      setStateProds(s => ({
        ...s,
        productCount: productsInCategory?.fetchProductsInCategory.count,
        currentProducts: productsInCategory?.fetchProductsInCategory?.products,
        totalPages: productsInCategory?.fetchProductsInCategory?.totalPages
      }));
    }


    if (!!productsInDepartment && productsInDepartment?.fetchProductsInDepartment) {
      setStateProds(s => ({
        ...s,
        productCount: productsInDepartment?.fetchProductsInDepartment.count,
        currentProducts: productsInDepartment?.fetchProductsInDepartment?.products,
        totalPages: productsInDepartment?.fetchProductsInDepartment?.totalPages
      }));
    }

    if (!!productSearch && productSearch?.productSearch && !!searchProduct) {
      setStateProds(s => ({
        ...s,
        productCount: productSearch?.productSearch.count,
        currentProducts: productSearch?.productSearch?.products,
        totalPages: productSearch?.productSearch?.totalPages
      }));
    }

    return () => { }
  }, [fetchAllProducts, fetchAllCategories, fetchAllAttributes, productsInCategory, productsInDepartment, fetchAllAttributeValues, productSearch, searchProduct, fetchMoreAllProducts, selected])


  const handlePageClick = data => {
    let selected = data.selected;


    setSelected(selected)

    if (!!productsInCategory && productsInCategory?.fetchProductsInCategory) {

      fetchProductsInCategory(
        {
          variables: {
            categoryId: stateProds.categoryId,
            page: 1 + selected
          },
        }
      )
    } else if (!!productsInDepartment && productsInDepartment?.fetchProductsInDepartment) {
      fetchProductsInDepartment(
        {
          variables: {
            departmentId: stateProds.departmentId,
            page: 1 + selected
          },
        }
      )
    }

  };

  const handleInputChange = e => {
    setSearch(e.target.value)
  };

  const handleSearch = e => {
    e.preventDefault();

    setSearchProduct(true)

    if (search) {
      searchProducts({
        variables: {
          query: search
        }
      })
    }
  };

  const handleClearSearch = (e) => {
    e.preventDefault();
    refetch()

    setSearch('')
    setSearchProduct(false)

  };

  const handleToggleCategories = () => {
    refetchAllCategories();
  };

  const handleCategoryClick = e => {
    e.preventDefault();
    const categoryId = parseInt(e.target.id);

    setStateProds(s => ({
      ...s,
      categoryId: categoryId
    }));

    fetchProductsInCategory(
      {
        variables: {
          categoryId: categoryId,
          page: 1
        },
      }
    )

  };

  const handlePrice = (event, newValue, activeThumb) => {

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minPrice), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minPrice)]);
    }
  };

  if (loading || loadingCategories || loadingAttribute || loadingAttributeValue || loadingProductsInCategory || loadingProductsInDepartment || loadingProductSearch || networkStatus === NetworkStatus.refetch) {
    return <LoadingAnimations />;
  }

  if (error || errorCategories || errorAttribute || errorAttributeValue || errorProductsInCategory || errorProductsInDepartment || errorProductSearch) {
    return <div>Error occurred</div>;
  }
  if (networkStatus === NetworkStatus.refetch) return <LoadingAnimations />;


  const { classes } = props;

  const { currentCategories, attributeValues, attributes } = stateProds;

  const mappedValues = {
    Color: [],
    Size: []
  };

  attributeValues.forEach(value => {
    const attributeId = value.attributeId;
    const attributeName = attributes.find(attr => attr.id === attributeId)?.name;

    if (attributeName === 'Color') {
      mappedValues.Color.push(value.value);
    } else if (attributeName === 'Size') {
      mappedValues.Size.push(value.value);
    }
  });

  const colorValues = mappedValues.Color;
  const sizeValues = mappedValues.Size;

  return (
    <div className={classes?.root}>
      {/* <LandingBanner /> */}
      <Container>
        <Section>
          <div className="flex mb-4 contentHolder mt-16">
            <div className="w-1/4 filterSection">
              <Paper elevation={1} className={classes.controlContainer}>

                <div className={classes.filterBlock}>
                  <div className={classes.titleContainer}>
                    <span className={classes.controlsTopTitle}>
                      Filter Items
                    </span>
                  </div>
                  <div className={classes.filterItems}>
                    <div className="py-1">
                      <Link onClick={handleToggleCategories}>
                        Categories
                      </Link>
                    </div>
                    <div className="py-1 pb-2">
                      {currentCategories.map((category, index) => (
                        <div key={index} className={classes.isGrey}>
                          <Link
                            id={category.id}
                            onClick={handleCategoryClick}
                          >
                            {category.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={classes.filterBodyContainer}>
                  {attributes?.map((attribute, index) => {
                    if (attribute.name === "Color") {
                      return (
                        <div
                          className={classes.colorBlock}
                          key={index}
                          id={attribute.attribute_id}
                        >
                          <div className={classes.titleContainer}>
                            <span
                              className={classes.controlsTitle}
                              id={attribute.attribute_id}
                            >
                              {attribute.name}
                            </span>
                          </div>

                          <div className={classes.colorRadiosContainer}>
                            {colorValues &&
                              colorValues.map((value, index) => (
                                <Radio
                                  style={{
                                    padding: 0,
                                    color: `${value === "White"
                                      ? "#eee"
                                      : value
                                      }`
                                  }}
                                  size="small"
                                  key={index}
                                  icon={<FiberManualRecord />}
                                  value={value}
                                  name="radio-button-demo"
                                  aria-label="A"
                                />
                              ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className={classes.sizesBlock} key={index}>
                          <div className={classes.titleContainer}>
                            <span
                              className={classes.controlsTitle}
                              id={attribute.attribute_id}
                            >
                              {attribute.name}
                            </span>
                          </div>

                          <div className={classes.sizeCheckboxes}>
                            {sizeValues &&
                              sizeValues.map((value, index) => (
                                <Checkbox
                                  key={index}
                                  style={{ padding: 0, textAlign: 'center' }}
                                  checkedIcon={
                                    <div
                                      className={classes.sizeCheckboxChecked}
                                    >
                                      {value}
                                    </div>
                                  }
                                  icon={
                                    <div
                                      className={
                                        classes.sizeCheckboxUnchecked
                                      }
                                    >
                                      {value}
                                    </div>
                                  }
                                  value={value}
                                />
                              ))}
                          </div>
                        </div>
                      );
                    }
                  })}

                  <div className={classes.sliderBlock}>
                    <div className={classes.titleContainer}>
                      <span className={classes.controlsTitle}>
                        Price Range
                      </span>
                    </div>
                    <div className={classes.sliderContainer}>
                   
                      <Slider
                        getAriaLabel={() => 'Minimum Price'}
                        value={price}
                        onChange={handlePrice}
                        // valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                        defaultValue={200}
                        min={5}
                        max={1000}
                        disableSwap
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        height: "24px"
                      }}
                    >
                      <div className={classes.rangesText}>{`£ ${price[0]}`}</div>
                      <div style={{ flexGrow: 1 }} />
                      <div className={classes.rangesText}>{`£ ${price[1]}`}</div>
                    </div>
                  </div>
                  <div className={classes.searchBlock}>
                    <div className={classes.titleContainer}>
                      <span className={classes.controlsTitle}>
                        Search keyword
                      </span>
                    </div>
                    <div className={classes.searchContainer}>
                      <TextField
                        inputProps={{
                          className: classes.filterSearchInput
                        }}
                        placeholder="Search..."
                        margin="dense"
                        variant="outlined"
                        name="search"
                        value={search}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className={classes.footerBlock}>
                  <Fab
                    color="primary"
                    size="small"
                    className={classes.coloredButton}
                    style={{ borderRadius: 24, height: 35, width: 90 }}
                    onClick={handleSearch}
                  >
                    <span className={classes.submitButtonText}>Apply</span>
                  </Fab>

                  <Button
                    className={classes.clearText}
                    onClick={handleClearSearch}
                  >
                    <Close className={classes.boldIcon} />
                    <span>Reset</span>
                  </Button>
                </div>
              </Paper>
            </div>
            <div className="w-full products__contents">
              {stateProds.currentProducts?.length < 20 && stateProds.productCount < 20 && stateProds.totalPages === 1 ? (
                ""
              ) : (

                <ReactPaginate
                  nextLabel=" >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={stateProds.totalPages}
                  previousLabel="< "
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}

                />
              )}

              <div className="flex flex-wrap ml-6 productsSection">

                {stateProds.currentProducts.length === 0 ? <div className="flex flex-wrap mt-10 justify-center">No Product found</div> :
                  stateProds.currentProducts?.map((product, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4"
                    >
                      <ListProduct product={product} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <Banner />
        </Section>
        <Section>
          <SubscribeBar />
        </Section>
      </Container>
    </div >
  );
}

export default withStyles(styles)(Home)