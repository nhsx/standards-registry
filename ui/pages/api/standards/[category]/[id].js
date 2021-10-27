export default async function handler(req, res) {
  const { id } = req.query;
  const ckanURL = process.env.CKAN_URL;
  const response = await fetch(`${ckanURL}/package_show?id=${id}`);
  const data = await response.json();
  res.status(200).json(data.result)
}
