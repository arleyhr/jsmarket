import { useAuth } from '../../hooks/useAuth';
import { useLoginModal } from '../../hooks/useLoginModal';
import Footer from '../footer';
import Header from '../header';
import LoginModal from '../user/login-modal';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { login, register } = useAuth();
  const { isOpen, closeModal } = useLoginModal();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      {isOpen && <LoginModal onClose={closeModal} onLogin={login} onRegister={register} />}
      <Footer />
    </div>
  );
}

export default Layout;
