import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerNavs = [
  { href: "#home", name: "Home" },
  { href: "#menu", name: "Menu" },
  { href: "#about", name: "About" },
  { href: "#gallery", name: "Gallery" },
  { href: "#contact", name: "Contact" },
  { href: "#reservations", name: "Reservations" },
];

const socialLinks = [
  { href: "#", icon: Instagram, name: "Instagram" },
  { href: "#", icon: Facebook, name: "Facebook" },
  { href: "#", icon: Twitter, name: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Cafe Elaichi</h3>
            <p className="text-sm text-muted-foreground">
              A Refreshing Café Experience.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">Quick Links</h4>
                <ul className="space-y-2">
                  {footerNavs.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>123 Chai Lane, Flavor Town</p>
                  <p>Email: contact@cafeelaichi.com</p>
                  <p>Phone: (123) 456-7890</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Follow Us</h4>
                <div className="flex space-x-2">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <Link href={social.href} aria-label={social.name}>
                        <social.icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Cafe Elaichi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
