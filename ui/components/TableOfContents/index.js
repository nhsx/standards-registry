import { Link } from '../';
import { fromMarkdown } from 'mdast-util-from-markdown';

const TocItem = ({ text }) => (
  <li>
    <Link
      text={text}
      href={'#' + text.toLowerCase().trim().replaceAll(/%20| /gm, '-')}
    />
  </li>
);

const TocList = ({ depth, text }) => {
  return (
    <>
      {(depth - 2 >= 0 && (
        <ul className="nhsuk-list-bullet">
          <TocList depth={depth - 1} text={text} />
        </ul>
      )) || <TocItem text={text} />}
    </>
  );
};

export const TableOfContents = ({ content }) => {
  const parsed = fromMarkdown(content);
  const headings = parsed.children.filter((i) => i.type === 'heading');
  return (
    <div className="nhsuk-grid-column-one-third">
      <h3 className="nhsuk-heading-s">Contents</h3>

      {headings.map((heading, i) => {
        const { depth, children } = heading;
        const text = children
          .reduce((i, child) => (i = [...i, child.value]), [])
          .join(' ');
        return <TocList text={text} depth={depth} key={i} />;
      })}
    </div>
  );
};
