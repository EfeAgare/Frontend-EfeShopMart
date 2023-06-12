import { gql } from '@apollo/client';

export const FETCH_PRODUCTS_IN_CATEGORY = gql`
    query fetchProductsInCategory ($page: Int, $perPage: Int, $categoryId: ID!) {
        fetchProductsInCategory (page: $page, perPage: $perPage, categoryId: $categoryId) {
            count
            totalPages
             products {
            description
            discountedPrice
            id
            image
            image2
            name
            price
            thumbnail
        }
        }
    }
`;