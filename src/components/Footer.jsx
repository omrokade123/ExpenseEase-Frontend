import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto" style={{padding:"2rem",marginTop:"2rem"}}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
              ExpenseEase
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Take control of your financial future. Track every rupee, set smart budgets, and achieve your saving goals with ease.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/addExpense" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
                  Add Expense
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
                  Analytics (Coming Soon)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Social */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">
              Subscribe to get financial tips and updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} ExpenseEase. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <SocialLink href="#" label="Twitter" icon={
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            }/>
            <SocialLink href="#" label="GitHub" icon={
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            }/>
            <SocialLink href="#" label="LinkedIn" icon={
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            }/>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Helper for Social Icons
const SocialLink = ({ href, icon, label }) => (
  <a 
    href={href} 
    className="text-gray-400 hover:text-indigo-600 transition-colors"
    aria-label={label}
  >
    <svg 
      className="h-5 w-5" 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      stroke="none"
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
    >
      {icon}
    </svg>
  </a>
);

export default Footer;