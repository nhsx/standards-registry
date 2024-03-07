import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import style from './MarkdownBlock.module.css';

function replacer(matched) {
  const newStr = decodeURIComponent(matched.replace(/\+/g, ' '));
  return newStr;
}

export default function MarkdownBlock({ md }) {
  const linkRegex = /(?<=href=")[^"]+/g;
  const mdString = Array.isArray(md) ? md.join("\n") : md;
  const decodedMd = mdString.replace(linkRegex, replacer);

  return (
    <div className={`nhsuk-u-font-size-16 ${style.markdown}`}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{decodedMd}</ReactMarkdown>
    </div>
  );
}
