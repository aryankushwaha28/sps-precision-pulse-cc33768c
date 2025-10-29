import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import logo from "@/assets/sps-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-16">
                <img src={logo} alt="SPS Logo" className="h-full w-auto object-contain" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Engineering Reliability Since 2006
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>High Pressure Triplex Pumps</li>
              <li>Tube Cleaning Accessories</li>
              <li>CNC Machined Components</li>
              <li>Custom Pumping Systems</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:sps.bsk2011@gmail.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  sps.bsk2011@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+919811112086"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  +91 9811112086
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  B.S.K., Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Linkedin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/in/brajendra-singh-34b1b049/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Brajendra Singh
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Saraswati Pumps & Systems. All Rights Reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Serving Industries Since 2006
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
