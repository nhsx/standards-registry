import { list } from '../../helpers/api';

export default async function handler(req, res) {
  const data = await list(req.body);

  res.status(200).json(data);
}
