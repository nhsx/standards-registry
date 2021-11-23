export default function Hero({ children }) {
  return (
    <section className="nhsuk-hero">
      <div className="nhsuk-width-container">
        <div className="nhsuk-hero__wrapper">{children}</div>
      </div>
    </section>
  );
}
