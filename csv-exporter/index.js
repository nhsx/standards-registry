import 'dotenv/config';
import { getAllDataSets } from './get';

const { CKAN_URL: ckanUrl, CKAN_API_KEY: ckanApiKey } = process.env;

getAllDataSets(ckanUrl, ckanApiKey);
