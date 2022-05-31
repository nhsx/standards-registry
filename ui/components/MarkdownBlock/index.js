import ReactMarkdown from 'react-markdown';
import { parse } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export default function MarkdownBlock({ md }) {
  return (
    <div className="nhsuk-u-font-size-16">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}

export const MarkdownRender = ({ md }) => (
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parse(md)) }} />
);
