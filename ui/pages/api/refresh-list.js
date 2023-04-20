import { list } from '../../helpers/api';

export default async function handler(req, res) {
  const futureAndPublished = req.body.futureAndPublished || false;
  delete req.body.futureAndPublished;
  const data = await list(req.body, futureAndPublished);

  res.status(200).json(data);
}
