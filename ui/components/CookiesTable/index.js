import React from 'react';
import { Details, Table, Thead, Tbody, Tr, Td, Th } from '../';

const cookies = {
  mandatory: {
    title: 'Cookies that make our website work',
    summary: 'List of cookies that make our website work',
    items: [
      {
        name: 'ppms_privacy',
        purpose: 'Remembers if you used our cookies banner',
        expiry: `When you close the browser (if you do not use the
        banner) or 1 year (if you use the banner).`,
      },
      {
        name: 'ANONCHK',
        purpose: `Used by Microsoft Clarity to anonymously observe user
        journeys on the website and produce heatmaps. Indicates
        whether MUID is transferred to ANID, a cookie used for
        advertising. Clarity doesn't use ANID and so this is always
        set to 0.`,
        expiry: '12 months',
      },
      {
        name: 'SM',
        purpose: `Used by Microsoft Clarity to anonymously observe user
        journeys on the website and produce heatmaps. Used in
        synchronizing the MUID across Microsoft domains.`,
        expiry: '12 months',
      },
      {
        name: 'SRM_B',
        purpose: `Used by Microsoft Bing. Registers a unique ID that is used
        to generate statistical data on how the visitor uses the
        website.`,
        expiry: '12 months',
      },
    ],
  },
  optional: {
    title: 'Cookies that measure website use',
    summary: 'List of cookies that measure website use',
    intro: (
      <>
        <p>We also like to use analytics cookies.</p>
        <p>
          These cookies store anonymous information about how you use our
          website, such as which pages you visit or what you click on.
        </p>
      </>
    ),
    items: [
      {
        name: '_clck',
        purpose: `Used by Microsoft Clarity to anonymously observe user
        journeys on the website and produce heatmaps. Persists the
        Clarity User ID and preferences, unique to that site, on the
        browser. This ensures that behavior in subsequent visits to
        the same site will be attributed to the same user ID.`,
        expiry: '12 months',
      },
      {
        name: '_clsk',
        purpose: `Used by Microsoft Clarity to anonymously observe user
        journeys on the website and produce heatmaps. Connects
        multiple page views by a user into a single Clarity session
        recording.`,
        expiry: '12 months',
      },
      {
        name: 'MR',
        purpose: `Used by Microsoft Clarity to anonymously observe user
        journeys on the website and produce heatmaps. Indicates
        whether to refresh MUID.`,
        expiry: '12 months',
      },
      {
        name: 'MUID',
        purpose: `Used by Microsoft Clarity to anonymously observe user
        journeys on the website and produce heatmaps. Identifies
        unique web browsers visiting Microsoft sites. These cookies
        are used for advertising, site analytics, and other
        operational purposes.`,
        expiry: '12 months',
      },
      {
        name: '_ga',
        purpose: `Used by Google Analytics. Registers a unique ID that is used
        to generate statistical data on how the visitor uses the
        website.`,
        expiry: '2 years',
      },
      {
        name: '_ga_#',
        purpose: `Used by Google Analytics to collect data on the number of
        times a user has visited the website as well as dates for
        the first and most recent visit.`,
        expiry: '2 years',
      },
    ],
  },
};

function CookieTablePart({ type }) {
  const content = cookies[type];
  return (
    <>
      <h2>{content.title}</h2>
      {content.intro}
      <Details summary={content.summary}>
        <div className="nhsuk-table-responsive app-table-responsive--cookies">
          <Table>
            <caption className="nhsuk-table__caption nhsuk-u-visually-hidden">
              Cookie names and purposes
            </caption>
            <Thead className="nhsuk-table__head">
              <Tr>
                <Th>Cookie name</Th>
                <Th>Purpose</Th>
                <Th>Expiry</Th>
              </Tr>
            </Thead>
            <Tbody>
              {content.items.map((item, index) => (
                <Tr key={index}>
                  <Td data-label="Cookie name">{item.name}</Td>
                  <Td data-label="Purpose">{item.purpose}</Td>
                  <Td data-label="Expiry">{item.expiry}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </Details>
    </>
  );
}

export function CookiesTable() {
  return (
    <>
      <CookieTablePart type="mandatory" />
      <CookieTablePart type="optional" />
      <p>{`We'll only use these cookies if you say it's OK. We'll use a cookie to
      save your settings.`}</p>
    </>
  );
}
