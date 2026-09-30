const avatar = (seed, bg) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=${bg}`

export const heroAvatars = [
  { name: 'Amara', src: avatar('Amara', 'dbeafe') },
  { name: 'Daniel', src: avatar('Daniel', 'fef3c7') },
  { name: 'Sade', src: avatar('Sade', 'e0e7ff') },
  { name: 'Jide', src: avatar('Jide', 'dcfce7') },
]