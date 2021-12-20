# Import standards data from the shared spreadsheet ✍️

NB: This is a work in progress, there are probably errors

1. Make sure https://docs.google.com/spreadsheets/d/1ulj3WY6Nvr9LCHY84SFjtLLgCLweMA75Bvp3dcsLzGQ/edit is as up to date as possible [TODO: make location editable]
2. Get your API KEY and CKAN URL from whichever ckan you want to import to. API keys should be available from your user profile, e.g. http://localhost:5005/user/ralph/api-tokens
   a. e.g. ckanUrl = http://localhost:5000
   b. ckanApiKey = 203473209483204982394
3. run `$ CKAN_URL=ckanUrl CKAN_API_KEY=ckanApiKey node [your-path-to]/standards-registry/reader index.js`
4. this should generate a log of all imported records, successes and failures
5. confirm whether it looks like it's working on CKAN

