import { Link } from '../';
import classnames from 'classnames';
import styles from './style.module.scss';

const TocItem = ({ text }) => (
  <Link
    text={text}
    href={'#' + text.toLowerCase().trim().replaceAll(/%20| /gm, '-')}
  />
);

const TocList = ({ depth, text, minDepth }) => {
  return (
    <li className={classnames({ [styles.noMarker]: depth > minDepth })}>
      {depth > minDepth ? (
        <ul className="nhsuk-list-bullet">
          <TocList depth={depth - 1} text={text} minDepth={minDepth} />
        </ul>
      ) : (
        <TocItem text={text} />
      )}
    </li>
  );
};

export const TableOfContents = ({ content }) => {
  const headings = content.children.filter((i) => i.type === 'heading');
  const depths = headings.map((h) => h.depth);
  const minDepth = Math.min(...depths);

  return (
    <div className="nhsuk-grid-column-one-third">
      <h3 className="nhsuk-heading-s">Contents</h3>
      <ul className="nhsuk-list-bullet">
        {headings.map((heading, i) => {
          const { depth, children } = heading;
          const text = children
            .reduce((i, child) => (i = [...i, child.value]), [])
            .join(' ');
          return (
            <TocList text={text} depth={depth} key={i} minDepth={minDepth} />
          );
        })}
      </ul>
    </div>
  );
};
