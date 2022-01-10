import { parse } from 'marked';

const createMarkup = (htmlstr) => {
  return {
    __html: htmlstr,
  };
};

export default function MarkdownBlock({ md }) {
  return (
    <div
      className="nhsuk-u-font-size-16"
      dangerouslySetInnerHTML={createMarkup(parse(md))}
    />
  );
}

export const MarkdownRender = ({ md }) => (
  <div dangerouslySetInnerHTML={createMarkup(parse(md))} />
);
