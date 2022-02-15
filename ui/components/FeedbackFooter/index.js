import Link from '../Link';
export default function FeedbackFooter() {
  return (
    <>
      <h2 id="feedback" className="nhsuk-heading-s">
        Feedback on this page
      </h2>
      <p className="nhsuk-u-font-size-16">
        To report a problem or suggest an improvement, email{' '}
        <Link
          href="mailto:standards.directory@nhsx.nhs.uk"
          text="standards.directory@nhsx.nhs.uk"
        />
        .
      </p>
    </>
  );
}
