import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const useHealthCheck = () => {
  const { loading } = useQuery(gql`
    query HealthCheck {
      healthCheck
    }
  `, {
    fetchPolicy: 'network-only'
  });

  return loading;
};
