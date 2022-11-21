export const setValueToBoolean = (record) => {
  for (const [key, value] of Object.entries(record)) {
    if (value && typeof value === 'string' && value.match(/true|false/)) {
      record[key] = value.toLowerCase() === 'true';
    }
  }
  return record;
};
