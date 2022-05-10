# Standards Directory

## Services

### UI

Node.js webserver for the UI client.

### CKAN

TBC.

## Running a local UI instance

### Prerequisites

You will need [node.js](https://nodejs.org/en/) installed.

### Getting started

Clone the repository and open a terminal window in the `./ui` directory.

```
git clone git@github.com:nhsx/standards-registry.git
cd ./standards-registry/ui
```

### Configuration

Create a `.env` file containing the following content:

```
touch .env.local
echo "CKAN_URL=https://manage.test.standards.nhs.uk/api/action" >> .env.local
```

### Running the server

Then run the following commands in the `./ui` directory:

```
npm ci
npm run dev
```

You can then access `http://localhost:3000` in a browser. The server will automatically compile your changes and you should see them in the browser straight away. If this doesn't work you can stop the server by pressing `Ctrl+C` and restarting it by running `npm run dev` again.

This will run a development instance of the interface serving data from the test instance of CKAN. To use a different CKAN instance you can change the value of the `CKAN_URL` variable in your `.env` file.

### Making changes

The UI service is a [Next.js](https://nextjs.org/docs/getting-started) app. 

* Pages are stored in the `./pages` folder - [documentation on how to add new pages to the app](https://nextjs.org/docs/basic-features/built-in-css-support)
* Components that are used across multiple pages are stored in the `./components` folder
