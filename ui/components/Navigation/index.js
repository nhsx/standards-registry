import Link from 'next/link';

export default function Navigation() {

  const links = [
    {
      label: 'Published standards',
      url: '/standards'
    },
    {
      label: 'Future standards',
      url: '/roadmap'
    },
    {
      label: 'About interoperability',
      url: '/what-information-standards-are'
    },
    {
      label: 'Community',
      url: '/community'
    }
  ]

  return (
    <nav className="nhsuk-header__navigation" id="header-navigation" role="navigation" aria-label="Primary navigation" aria-labelledby="label-navigation">
      <div className="nhsuk-width-container">
        <p className="nhsuk-header__navigation-title"><span id="label-navigation">Menu</span>
          <button className="nhsuk-header__navigation-close" id="close-menu">
            <span className="nhsuk-u-visually-hidden">Close menu</span>
          </button>
        </p>
        <ul className="nhsuk-header__navigation-list">
          {
            links.map(link => (
              <li className="nhsuk-header__navigation-item" key={link.label}>
                <Link href={link.url}>
                  <a className="nhsuk-header__navigation-link">{ link.label }</a>
                </Link>
              </li>
            ))
          }

        </ul>
      </div>
    </nav>
  );
}
