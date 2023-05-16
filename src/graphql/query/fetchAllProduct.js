import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query fetchAllProducts ($page: Int, $perPage: Int) {
    fetchAllProducts (page: $page, perPage: $perPage) {
        count
        totalPages
    }
}

`;