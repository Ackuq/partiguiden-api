/**
 * Until
 * * Call this function in and async function to wait for a condition to be true before executing the rest
 * @param conditionFunction a condition that will eventually return true
 */

module.exports = conditionFunction => {
  const poll = resolve => {
    if (conditionFunction()) resolve();
    else setTimeout(() => poll(resolve), 400);
  };

  return new Promise(poll);
};
