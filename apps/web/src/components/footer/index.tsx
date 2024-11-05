import { IconHeartCode } from "@tabler/icons-react";

const Footer = () => (
  <footer className="bg-zinc-900 text-white">
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Get to Know Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Careers</a></li>
            <li><a href="#" className="hover:text-gray-300">Press Releases</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Make Money with Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Sell products</a></li>
            <li><a href="#" className="hover:text-gray-300">Become an Affiliate</a></li>
            <li><a href="#" className="hover:text-gray-300">Advertise Your Products</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Payment Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Business Card</a></li>
            <li><a href="#" className="hover:text-gray-300">Shop with Points</a></li>
            <li><a href="#" className="hover:text-gray-300">Reload Your Balance</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Let Us Help You</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Your Account</a></li>
            <li><a href="#" className="hover:text-gray-300">Your Orders</a></li>
            <li><a href="#" className="hover:text-gray-300">Help</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center border-t border-gray-700 pt-8">
        <p className="text-sm flex justify-center items-center">&copy; {new Date().getFullYear()} Carefully crafted by arleyhr with <span className="ml-1"><IconHeartCode size={16} /></span> </p>
      </div>
    </div>
  </footer>
);

export default Footer;
