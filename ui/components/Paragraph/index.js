export default function Paragraph({ children, className }) {
  return <p className={className || 'nhsuk-u-font-size-16'}>{children}</p>;
}
