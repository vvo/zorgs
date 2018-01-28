module.exports = function formatRateLimit({ remaining, limit }) {
  return `${remaining.toLocaleString()}/${limit.toLocaleString()}`;
};
