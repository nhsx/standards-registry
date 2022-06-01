import { Link } from '../';

const TocItem = ({ text }) => (
  <li>
    <Link
      text={text}
      href={'#' + text.toLowerCase().trim().replaceAll(/%20| /gm, '-')}
    />
  </li>
);

const TocList = ({ depth, text }) => {
  // # = depth:1
  // ## = depth:2
  // ### = depth:3 etc
  // starting at depth-2 means h1s and h2s at top level
  // this is because we don't expect to get h1 content in this component
  // but we'll still render it into the TOC if we do
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
  const headings = content.children.filter((i) => i.type === 'heading');
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
