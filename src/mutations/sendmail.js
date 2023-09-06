import { gql } from '@apollo/client';

const SEND_EMAIL_MUTATION = gql`
  mutation SEND_EMAIL($text: String!, $mail: String!) {
    sendEmail(
      input: {
        to: "enquiries@thepolerouter.com"
        from: $mail
        subject: "Request from site"
        body: $text
        clientMutationId: "test"
      }
    ) {
      origin
      sent
      message
    }
  }
`;

export default SEND_EMAIL_MUTATION;
