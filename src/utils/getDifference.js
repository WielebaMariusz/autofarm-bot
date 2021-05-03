const getDifference = (curr, prev) => {
  return curr.filter(i => !prev.includes(i)).concat(prev.filter(i => !curr.includes(i)));
};

module.exports = getDifference;
