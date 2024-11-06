import { useQuery, useMutation } from '@apollo/client';

import { GET_CURRENT_USER, LOGIN_MUTATION, REGISTER_MUTATION } from '../queries/user';

export const useAuth = () => {
  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);

  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await login({
        variables: { email, password }
      });

      const newToken = data.login.token;

      localStorage.setItem('token', newToken);

      window.location.reload();
      return data.login.user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error logging in');
    }
  };

  const handleRegister = async (user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const { data } = await register({
        variables: { user }
      });

      const newToken = data.register.token;

      localStorage.setItem('token', newToken);

      window.location.reload();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error registering user');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return {
    user: userData?.me,
    isLoading: userLoading,
    isAuthenticated: !!userData?.me,
    login: handleLogin,
    register: handleRegister,
    logout
  };
};
