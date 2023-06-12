import { gql } from '@apollo/client';

export const FETCH_PRODUCTS_IN_DEPARTMENT = gql`
query fetchProductsInDepartment ($page: Int, $perPage: Int, $departmentId: ID!) {
    fetchProductsInDepartment (page: $page, perPage: $perPage, departmentId: $departmentId) {
        
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