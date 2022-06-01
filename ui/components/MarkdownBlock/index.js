import ReactMarkdown from 'react-markdown';
import { parse } from 'marked';

export default function MarkdownBlock({ md }) {
  return (
    <div className="nhsuk-u-font-size-16">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}

export const MarkdownRender = ({ md }) => (
  <div dangerouslySetInnerHTML={{ __html: parse(md) }} />
);
