# Import standards data from the shared spreadsheet ✍️

NB: This is a work in progress, there are probably errors

## Getting credentials

1. go to https://console.cloud.google.com/apis/credentials?authuser=1&project=ckan-metas 
2. https://console.cloud.google.com/iam-admin/serviceaccounts/details/116550580881572683547/keys?authuser=1&project=ckan-metas
3. ADD KEY => Create new key =>  select JSON 
4. save as reader/credentials.json (do not upload anywhere)

5. Make sure https://docs.google.com/spreadsheets/d/1ulj3WY6Nvr9LCHY84SFjtLLgCLweMA75Bvp3dcsLzGQ/edit is as up to date as possible [TODO: make location editable]
6. Get your API KEY and CKAN URL from whichever ckan you want to import to. API keys should be available from your user profile, e.g. http://localhost:5005/user/ralph/api-tokens
   a. e.g. ckanUrl = http://localhost:5000
   b. ckanApiKey = 203473209483204982394
7. run `$ CKAN_URL=ckanUrl CKAN_API_KEY=ckanApiKey node [your-path-to]/standards-registry/reader index.js`
8. this should generate a log of all imported records, successes and failures
9. confirm whether it looks like it's working on CKAN

