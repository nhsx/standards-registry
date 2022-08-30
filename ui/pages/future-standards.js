import { Reading } from '../components';

export default function RoadmapPlaceholder() {
  const email = 'england.interop.standards@nhs.net';
  return (
    <Reading>
      <h1>Page coming soon</h1>
      <p>This page will be available soon.</p>
      <p>In the meantime if you have any questions about future standards, email <a href={`mailto:${email}`}>{email}</a>.</p>
    </Reading>
  )
}
