import { makeVar, useReactiveVar } from '@apollo/client';

export const isLoginModalOpenVar = makeVar<boolean>(false);

export const useLoginModal = () => {
  const isOpen = useReactiveVar(isLoginModalOpenVar);

  const openModal = () => isLoginModalOpenVar(true);
  const closeModal = () => isLoginModalOpenVar(false);
  const toggleModal = () => isLoginModalOpenVar(!isOpen);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};
