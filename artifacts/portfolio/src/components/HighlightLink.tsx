interface HighlightLinkProps {
  text: string;
  href?: string;
  external?: boolean;
}

export function HighlightLink({ text, href, external = true }: HighlightLinkProps) {
  const content = (
    <span className="relative inline font-semibold text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-full">
      {text}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="hover:no-underline transition-colors cursor-pointer inline"
      >
        {content}
      </a>
    );
  }

  return <>{content}</>;
}
