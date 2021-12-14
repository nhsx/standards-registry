export default function Link({ href, text, newWindow = false }) {
  return (
    <a target={newWindow ? '_blank' : '_self'} href={href} rel="noreferrer">
      {text || href}
    </a>
  );
}
