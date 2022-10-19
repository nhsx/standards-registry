export async function getHost({ headers }) {
  return headers.host || null;
}
