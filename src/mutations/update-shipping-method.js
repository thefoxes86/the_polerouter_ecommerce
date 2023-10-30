import { gql } from '@apollo/client';

const UPDATE_SHIPPING_METHOD = gql`
  mutation updateShippingMethod($input: UpdateShippingMethodInput!) {
    updateShippingMethod(input: $input) {
      clientMutationId
    }
  }
`;

export default UPDATE_SHIPPING_METHOD;
