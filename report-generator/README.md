nhs_rep.py is a script that logs into a jira account for the project, looks at the issues that were done in the last week and also the issues that are currently in progres.

It then exports them according to a template into a markdown report file of the format YYYY-MM-DD.md. Then it add a link to this file to the markdown file index.md in /docs directory of the standards repository.

In order to run this script you need a config file (e.g. report.yaml). which has the following Values:

ATLASSIAN_USER - username for the jira account
ATLASSIAN - password for the jira account for the STANDARDS project
NHS_REPORT_TEMPLATE - path to the report template (e.g. points to the rep-scripts directory)
NHS_REPORT_TARGET_DIR - path to the directory that has the reports (e.g. '../docs/reports')
NHS_REPORT_INDEX - the reports index file (e.g. '../docs/index.md')

This is a python3 script.

On ubuntu at the command line, in the rep-scripts directory, I run:

>> python3 nhs_rep.py
