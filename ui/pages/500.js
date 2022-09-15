import { Reading } from '../components';

export default function Custom500() {
  return (
    <Reading>
      <h1>Sorry there is a problem with this service</h1>
      <p>
        You can try again later or for help, email{' '}
        <a href="mailto:england.interop.standards@nhs.net">
          england.interop.standards@nhs.net
        </a>
        .
      </p>
    </Reading>
  );
}
