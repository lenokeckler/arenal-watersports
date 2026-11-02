export interface LinkProps {
  ariaLabel?: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
