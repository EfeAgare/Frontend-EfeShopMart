import { gql } from '@apollo/client';

export const FETCH_ALL_ATTRIBUTES = gql`
query fetchAllAttributes {
    fetchAllAttributes {
        id
        name
    }
}
`;