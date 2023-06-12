import { gql } from '@apollo/client';

export const FETCH_ALL_CATEGORIES = gql`
  query fetchAllCategories {
    fetchAllCategories {
        description
        id
        name
    }
}

`;