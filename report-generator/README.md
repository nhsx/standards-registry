generate_report.py is a script that logs into a jira account for the project, looks at the issues that were done in the last week and also the issues that are currently in progress.

It then exports them according to a template into a markdown report file of the format YYYY-MM-DD.md. Then it add a link to this file to the markdown file index.md in /docs directory of the standards repository.

In order to run this script you need a config file (e.g. report.yaml). which has the following Values:

ATLASSIAN_USER - username for the jira account
ATLASSIAN - password for the jira account for the STANDARDS project
NHS_REPORT_TEMPLATE - path to the report template (e.g. points to the rep-scripts directory)
NHS_REPORT_TARGET_DIR - path to the directory that has the reports (e.g. '../docs/reports')
NHS_REPORT_INDEX - the reports index file (e.g. '../docs/index.md')


Python needs these packages to be installed:
beautifulsoup4==4.11.1
pandas==1.5.2
pandas_stubs==1.2.0.35
requests==2.25.1
ruamel.base==1.0.0
selenium==4.7.2

You also need to install chromedriver:
sudo apt-get -y install chromium-chromedriver

This is a python3 script.

On ubuntu at the command line, in the rep-scripts directory, I run:

>> python3 generate_report.py
