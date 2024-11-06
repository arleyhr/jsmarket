import { gql } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      email
      firstName
      lastName
      role
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        firstName
        lastName
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($user: UserInput!) {
    register(user: $user) {
      token
      user {
        email
        firstName
        lastName
        role
      }
    }
  }
`;

export type TUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
};

export { GET_CURRENT_USER, LOGIN_MUTATION, REGISTER_MUTATION };
