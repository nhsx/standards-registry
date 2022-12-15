# Data Migrations ✍️

NB: This is a work in progress, there are probably errors

## Set up environment

Create API tokens for each environment you want to run the migrations against

```
LOCAL_CKAN_API_TOKEN=<LOCAL_API_TOKEN>
LOCAL_CKAN_URL=http://localhost:5005/api/action

DEV_CKAN_API_TOKEN=<DEV_API_TOKEN>
DEV_CKAN_URL=https://manage.dev.standards.nhs.uk/api/action

TEST_CKAN_API_TOKEN=<TEST_API_TOKEN>
TEST_CKAN_URL=https://manage.test.standards.nhs.uk/api/action

PROD_CKAN_API_TOKEN=<PROD_API_TOKEN>
PROD_CKAN_URL=https://manage.standards.nhs.uk/api/action
```

## Create a new migration

Create a new migration by running the following command in the root of the reader directory:

```bash
$ npm run migration make <name>
```

This will create a new migration template in `./lib`, and corresponding test template in `./__tests__`

Migrations require a named export: `up`, and an optional export: `down`. If `down` is omitted the last migration is rolled back by applying the diff saved in cache.json.

## Running a migration

Run any new migrations since the last run.

```bash
$ npm run migration up
```

### Args

* `--dry-run` - Show the affected number of rows without running the migration
* `--env -e [local | dev | test | prod] (default local)` - The env to run against
* `--force` - Force rerun of a run migration (WIP - need to specify which)

The output of the migration is saved in `cache.json` - this should be committed to source control, however local cache should not. **TODO - split local cache to new gitignored file**

## Rolling back a migration

Roll back the last run migration. This will use `down` if specified, or will attempt to patch using the stored diff for each row if not.

```bash
$ npm run migration down
```

### Args

* `--dry-run` - Show the affected number of rows without running the migration
* `--env -e [local | dev | test | prod] (default local)` - The env to run against

The cache.json file is updated with the result of the rolled back migration