export default async function handler(req, res) {
  const ckanURL = process.env.CKAN_URL;
  const { term } = req.query;

  const response = await fetch(`${ckanURL}/package_search?q=${term}`)
  const data = await response.json();

  return res.status(200).json(data.result);
}
