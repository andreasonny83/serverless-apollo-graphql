const users = [
  {
    id: '1',
    name: 'sonny',
  },
  {
    id: '2',
    name: 'lelle',
  },
  {
    id: '3',
    name: 'penny',
  },
];

export default ids => {
  if (ids === null) {
    return users;
  }

  return users.filter(user => ids.indexOf(users.id) >= 0);
};
