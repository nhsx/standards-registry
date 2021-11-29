export default function Link({ href, text }) {
  return <a href={href}>{text || href}</a>;
}
