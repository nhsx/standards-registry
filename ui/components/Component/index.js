export default function Component({ name, children }) {
  return <div className={`nhsuk-${name}`}>{children}</div>;
}
