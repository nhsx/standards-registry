import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import style from './MarkdownBlock.module.css';

export default function MarkdownBlock({ md }) {
  return (
    <div className={`nhsuk-u-font-size-16 ${style.markdown}`}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{md}</ReactMarkdown>
    </div>
  );
}
