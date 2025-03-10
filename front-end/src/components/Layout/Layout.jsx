import { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src={require('../../assets/manager.png')} alt="Task Manager Logo" className="h-12 w-auto mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">Task Manager</h1>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
}