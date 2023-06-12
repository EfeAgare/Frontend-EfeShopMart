import { gql } from '@apollo/client';

export const PRODUCT_SEARCH = gql`
query productSearch ($page: Int, $perPage: Int, $query: String!) {
    productSearch (page: $page, perPage: $perPage, query: $query) {
        count
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
        totalPages
    }
}
`;