import Footer from '../footer';
import Header from '../header';


const Sidebar = () => (
  <aside className="w-64 bg-gray-100 p-4">
    <nav>
      <ul>
        <li className="mb-2">Menu Item 1</li>
        <li className="mb-2">Menu Item 2</li>
        <li className="mb-2">Menu Item 3</li>
      </ul>
    </nav>
  </aside>
);



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
        <Sidebar />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
