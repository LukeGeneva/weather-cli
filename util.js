const asyncPipe = (...fns) => (x) => fns.reduce(async (y, f) => f(await y), x);

const trace = (data) => {
  console.log(data);
  return data;
};

module.exports = { asyncPipe, trace };
