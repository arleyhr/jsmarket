import { useQuery, useMutation } from '@apollo/client';
import { UserRole } from '@jsmarket/state-machines';

import client from '../apollo';
import { GET_CURRENT_USER, LOGIN_MUTATION, REGISTER_MUTATION } from '../queries/user';

export const useAuth = () => {
  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);

  const logout = () => {
    localStorage.removeItem('token');
    client.resetStore();
    window.location.reload();
  };

  const isAdmin = userData?.me?.role === UserRole.ADMIN;

  return {
    isAdmin,
    logout,
    user: userData?.me,
    isLoading: userLoading,
    isAuthenticated: !!userData?.me,
  };
};

export const useLogin = () => {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({
        variables: { email, password }
      });

      const newToken = result.data?.login?.token;

      if (newToken) {
        localStorage.setItem('token', newToken);
      }

      window.location.reload();

      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error logging in');
    }
  };

  return { login: handleLogin, loading, error };
}

export const useRegister = () => {
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async (user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const result = await register({
        variables: { user }
      });

      const newToken = result.data?.register?.token;

      if (newToken) {
        localStorage.setItem('token', newToken);
      }

      window.location.reload();

      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error registering user');
    }
  };

  return { register: handleRegister, loading, error };
}
