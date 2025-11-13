import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Features
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Pricing
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Templates
                </Button>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  About
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Blog
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Careers
                </Button>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Help Center
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Contact
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Privacy
                </Button>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Social</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Twitter
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Instagram
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  LinkedIn
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Partiful. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
