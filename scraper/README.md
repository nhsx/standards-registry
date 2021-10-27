# Data scraper

Scrapes the PRSB and NHS Digital standards list and pulls basic metadata into a CSV document.

Also includes an ingest script that can take the output CSV and ingest datasets into CKAN.

## Running the scraper

```
npm start
```

When this is complete the records will be saved in `./standards.csv`

## Running the ingester

Create a `.env` file in this directory and define the following environment variables:

*`CKAN` - the base url of the CKAN instance
*`API_KEY` - an API key with write access to the CKAN instance

Then run:

```
npm run ingest
```
