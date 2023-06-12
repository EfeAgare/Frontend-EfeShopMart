import { gql } from '@apollo/client';

export const FETCH_ALL_PRODUCTS = gql`
  query fetchAllProducts ($page: Int, $perPage: Int) {
    fetchAllProducts (page: $page, perPage: $perPage) {
        count
        totalPages
        products {
          id
          name
          description
          price
          discountedPrice
          image
          image2
          thumbnail
        }
    }
  }
`;