import Link from '../Link';
export default function FeedbackFooter() {
  return (
    <>
      <h2 id="feedback" className="nhsuk-heading-s">
        Feedback on this page
      </h2>
      <p className="nhsuk-u-font-size-16">
        To report a problem, suggest an enhancement or propose a new feature,
        you can:
      </p>
      <ul className="nhsuk-list-bullet nhsuk-u-font-size-16">
        <li>
          email the standards directory team on{' '}
          <Link
            href="mailto:standardsdirectory@nhsx.nhs.uk"
            text="standardsdirectory@nhsx.nhs.uk"
          />
        </li>
        <li>
          raise an issue on the{' '}
          <Link
            href="https://github.com/Marvell-Consulting/standards-community-platform-for-health-and-social-care/projects/1"
            text="standards community development backlog on GitHub"
          />
        </li>
      </ul>
    </>
  );
}
