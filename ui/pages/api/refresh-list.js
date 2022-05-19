import { list } from '../../helpers/api';

export default async function handler(req, res) {
  const {
    q,
    page,
    sort,
    filters
  } = req.body;
  const data = await list({ q, page, sort, filters })

  res.status(200).json(data);
}
