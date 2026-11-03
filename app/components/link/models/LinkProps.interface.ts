export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}
