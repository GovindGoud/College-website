import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="gradient-primary rounded-lg p-1.5">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">College Events</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Your one-stop portal for discovering and registering for college events. Stay connected with campus life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-80">Quick Links</h4>
            <div className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/events", label: "Events" },
                { to: "/register", label: "Register" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-80">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm opacity-70">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>123 University Avenue, Campus City</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>events@college.edu</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm opacity-50">
          © 2026 College Event Registration Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
