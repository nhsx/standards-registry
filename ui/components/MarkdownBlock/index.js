import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function MarkdownBlock({ md }) {
  return (
    <div className="nhsuk-u-font-size-16">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{md}</ReactMarkdown>
    </div>
  );
}
