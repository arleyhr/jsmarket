import Footer from '../footer';
import Header from '../header';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
