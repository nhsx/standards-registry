const impactMap = {
  minor: 'minor 🟡',
  moderate: 'moderate 🟠',
  serious: 'serious 🔴',
  critical: 'critical 🔥',
};

// From https://github.com/component-driven/cypress-axe
// Define at the top of the spec file or just import it
export function a11yLog(violations) {
  cy.task(
    'log',
    `
    ${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected
    `
  );

  // Uncomment to log out all violations
  // cy.task('log',  violations);

  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({
      id,
      impact,
      description,
      // nodes,
      helpUrl,
    }) => ({
      id,
      impact: impactMap[impact],
      description,
      //   nodes: nodes.length,
      helpUrl,
    })
  );

  cy.task('table', violationData);
}
