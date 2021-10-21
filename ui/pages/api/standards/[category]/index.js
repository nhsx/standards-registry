const DATA = [
  {
    id: 123,
    title: 'About Me information standard',
    content: 'Part of a suite of social care standards, About Me information is the most important details that a person wants to share with professionals in health and social care',
    status: 'Active',
    compliance: 'Required',
    updatedAt: (new Date()).toISOString()
  },
  {
    id: 124,
    title: 'Ambulance handover to emergency care Standard',
    content: 'A standard for the information that is shared when care is transferred from ambulances to emergency departments.',
    status: 'Active',
    compliance: 'Required',
    updatedAt: (new Date()).toISOString()
  }
]

export default function handler(req, res) {
  res.status(200).json(DATA);
}
