import ReactMarkdown from 'react-markdown';

export default function MarkdownBlock({ md }) {
  return (
    <div className="nhsuk-u-font-size-16">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}
