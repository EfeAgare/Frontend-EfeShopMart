import { gql } from '@apollo/client';

export const FETCH_ALL_ATTRIBUTE_VALUE = gql`
query fetchAllAttributeValues {
    fetchAllAttributeValues {
        attributeId
        id
        value
    }
}
`;