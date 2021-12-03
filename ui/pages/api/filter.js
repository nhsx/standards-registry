// ui/pages/api/filter.js
import { filterSearch } from '../../helpers/api';

export default async function handler(req, res) {
  console.log(req, res);
  await filterSearch(req);
}
