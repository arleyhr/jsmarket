import { Toaster } from 'react-hot-toast';

import { useCartSidebar } from '../../hooks/useCart';
import { useLoginModal } from '../../hooks/useLoginModal';
import CartSidebar from '../cart/cart-sidebar';
import Footer from '../footer';
import Header from '../header';
import LoginModal from '../user/login-modal';


interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isOpen, closeModal } = useLoginModal();
  const { isSidebarOpen } = useCartSidebar();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      {isSidebarOpen && <CartSidebar />}
      {isOpen && <LoginModal onClose={closeModal} />}
      <Toaster />
      <Footer />
    </div>
  );
}

export default Layout;
