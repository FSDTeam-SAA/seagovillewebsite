import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer 
      style={{
        background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 50%, #FEFCE8 100%)'
      }}
      className="text-gray-800 mt-20 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Seagoville Pizza</h3>
            <p className="text-sm text-gray-700">
              Design amazing digital experiences that create more happy in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/home" className="text-gray-700 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-gray-700 hover:text-red-600 transition-colors">
                  Create Your Own Pizza
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Contact Information</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span className="text-gray-700">123 Main Street, Seagoville, TX 75159</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span className="text-gray-700">Phone: (972) 555-PIZZA</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span className="text-gray-700">info@seagovillepizza.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-gray-300 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-700">© 2025 Seagoville Pizza. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
