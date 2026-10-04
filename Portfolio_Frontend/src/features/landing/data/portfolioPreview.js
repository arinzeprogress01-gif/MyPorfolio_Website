

const firstMatch = (files) => Object.values(files)[0] ?? null

const profileImage = firstMatch(
  import.meta.glob('../../../assets/daniel-kalu.*', { eager: true, import: 'default' })
)
const projectImage = firstMatch(
  import.meta.glob('../../../assets/akpaka-eco-district.*', { eager: true, import: 'default' })
)
export const portfolioPreview = {
  profile: {
    image: profileImage,
    imageAlt: 'Portrait of Daniel Kalu',
    name: 'Daniel Kalu',
    role: 'Structural Engineer',
    summary: 'Designing safer, smarter structures for growing cities.',
    stats: [
      { value: '8+', label: 'Years' },
      { value: '12', label: 'Projects' },
      { value: '5', label: 'Credentials' },
    ],
    skills: ['Structural Design', 'Seismic Analysis', 'Sustainability', 'Revit'],
  },
  project: {
    label: 'Featured project',
    title: 'Akpaka Eco-District',
    image: projectImage,
    imageAlt: 'Residential tower with green terraces and plants on every balcony',
    challenge: 'Reducing carbon footprint of urban housing.',
    solution: 'Integrated green infrastructure.',
    cta: 'Case study',
    // footerTitle: 'Creative work.',
    // footerText: 'Ideas made visible.',
  },
  credentials: {
    title: 'Credentials',
    items: [
      {
        name: 'Chartered Structural Engineer (C.Eng MIStructE)',
        details: ['Issuer: Institution of Structural Engineers', 'License No: 203154'],
      },
      { name: 'LEED Accredited Professional (LEED AP BD+C)', details: [] },
    ],
    certificationsTitle: 'Certifications',
    certifications: [
      { name: 'Verified Educational Record', type: 'Link' },
      { name: 'Professional Liability Insurance', type: 'Verification' },
    ],
    note: 'Click to verify and download credentials.',
    footer: 'Verified expertise. Proof that travels.',
  },
}