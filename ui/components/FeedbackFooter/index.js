import Link from '../Link';
export default function FeedbackFooter() {
  return (
    <>
      <h2 id="feedback" className="nhsuk-heading-s">
        Feedback on this page
      </h2>
      <p className="nhsuk-u-font-size-16">
        To report a problem, suggest an enhancement or propose a new feature,
        you can email the standards directory team at{' '}
        <Link
          href="mailto:standards.directory@nhsx.nhs.uk"
          text="standards.directory@nhsx.nhs.uk"
        />
      </p>
    </>
  );
}
