function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${level}] ${message}`);
}
module.exports = { log };
