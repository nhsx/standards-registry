export default function Link({ href, text, newWindow = false, className }) {
  return (
    <a
      target={newWindow ? '_blank' : '_self'}
      href={href}
      rel="noreferrer"
      className={className}
    >
      {text || href}
    </a>
  );
}
