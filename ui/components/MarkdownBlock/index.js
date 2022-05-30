import Markdown from 'marked-react';
import { parse } from 'marked';

export default function MarkdownBlock({ md }) {
  return (
    <div className="nhsuk-u-font-size-16">
      <Markdown>{md}</Markdown>
    </div>
  );
}
const createMarkup = (htmlstr) => {
  return {
    __html: htmlstr,
  };
};

export const MarkdownRender = ({ md }) => (
  <div dangerouslySetInnerHTML={createMarkup(parse(md))} />
);
