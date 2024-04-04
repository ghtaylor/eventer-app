import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary p-12">
      <div className="container max-w-full md:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <p className="text-muted-foreground text-sm">© 2024 Eventer</p>
        <div className="flex flex-col gap-y-2">
          <Link href="#" className="text-muted-foreground text-sm">
            Contact Us
          </Link>
          <Link href="#" className="text-muted-foreground text-sm">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground text-sm">
            Terms of Service
          </Link>
          <Link href="#" className="text-muted-foreground text-sm">
            Accessibility
          </Link>
          <Link href="#" className="text-muted-foreground text-sm">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
