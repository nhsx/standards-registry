import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import get from 'lodash/get';
import Mustache from 'mustache';
import { useContentContext } from '../../context/content';

const trim = (value) =>
  value
    .split('\n')
    .map((s) => s.trim())
    .join('\n')
    .trim();

export default function Content({ children, inline, small, large, ...props }) {
  const { content } = useContentContext();
  const str = get(content, children);
  if (!str) {
    return null;
  }
  const source = trim(Mustache.render(str, props));

  function conditionalInline({ siblingCount, ...props }) {
    if (siblingCount === 1 && inline) {
      return <span {...props} />;
    }
    return (
      <p
        className={classnames({ 'nhsuk-body-s': small, 'nhsuk-body-l': large })}
        {...props}
      />
    );
  }

  return (
    <ReactMarkdown
      includeElementIndex={true}
      components={{ p: conditionalInline }}
    >
      {source}
    </ReactMarkdown>
  );
}
