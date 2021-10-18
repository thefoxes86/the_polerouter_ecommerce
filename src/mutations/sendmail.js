import { gql } from '@apollo/client';

const SEND_EMAIL_MUTATION = gql`
  mutation SEND_EMAIL {
    sendEmail(
      input: {
        to: "nicola@xdesigners.it"
        from: "enquiries@thepolerouter.com"
        subject: "test email"
        body: "test email"
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
