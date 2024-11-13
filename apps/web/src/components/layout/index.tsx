import { Toaster } from 'sonner';

import { useCartSidebar } from '../../hooks/useCart';
import { useLoginModal } from '../../hooks/useLoginModal';
import { useHealthCheck } from '../../queries/app';
import AppColdstart from '../app-coldstart';
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
  const isServerStarting = useHealthCheck();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">{children}</div>
        </main>
      </div>
      {isSidebarOpen && (
        <div className="hidden md:block">
          <CartSidebar />
        </div>
      )}
      {isOpen && <LoginModal onClose={closeModal} />}
      {isServerStarting && <AppColdstart />}
      <Toaster />
      <Footer />
    </div>
  );
}

export default Layout;
