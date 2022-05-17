export const mergeRecord = (ckanRecord, update) => ({
  ...ckanRecord,
  ...update,
});
