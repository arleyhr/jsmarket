import { gql } from "@apollo/client";
import { useEffect, useState } from "react";

import client from "../apollo";

export const useHealthCheck = () => {
  const [isStarting, setIsStarting] = useState(true);

  const HEALTH_CHECK = gql`
    query HealthCheck {
      healthCheck
    }
  `;

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const { data } = await client.query({
          query: HEALTH_CHECK,
          fetchPolicy: 'network-only',
        });

        if (data?.healthCheck === 'OK') {
          setIsStarting(false);
        }
      } catch (error) {
        setIsStarting(true);
      }
    };

    checkHealth();
  }, []);

  return isStarting;
}
