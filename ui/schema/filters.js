const filterSchema = {
  status: {
    type: 'OR',
  },
  standard_category: {
    type: 'AND',
  },
};

export default filterSchema;
