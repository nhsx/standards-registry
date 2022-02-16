import { Link } from '../';

export const TableOfContents = ({ content }) => {
  // Anything h2 and below
  const headingReg = new RegExp(/(#{2}\s)(.*)/gm);
  const headings = content.match(headingReg);

  return (
    <div className="nhsuk-grid-column-one-third">
      <h3 className="nhsuk-heading-s">Contents</h3>
      <ul className="nhsuk-list-bullet">
        {headings.map((elem, i) => {
          const heading = elem.replaceAll('#', '').trim();
          return (
            <li key={i}>
              <Link
                text={heading}
                href={
                  '#' + heading.toLowerCase().trim().replaceAll(/%20| /gm, '-')
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
