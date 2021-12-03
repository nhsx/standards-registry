import { filterSearch } from '../../helpers/api';

export default async function handler(req, res) {
  try {
    const data = await filterSearch(req.query.q);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
