const sshShell = require('./lib/sshShell.js');
const md5Result = require('./lib/md5ResultParser.js');
const bootPath = require('./lib/bootPathParser.js');
const hostName = require('./lib/hostNameParser.js');
const acaSwitches = require('./import/acaSwitches.js');
const ntfsFileNameFormatter = require('./lib/ntfsFileNameFormatter.js');
const {
  objectKeyFilter,
  writeFile,
  readFile,
  asyncRequest,
  prtgOptions,
} = require('nodeutilz');
const dotenv = require('dotenv').config({ path: './.env' });

module.exports = {
  sshShell,
  md5Result,
  bootPath,
  hostName,
  objectKeyFilter,
  dotenv,
  writeFile,
  ntfsFileNameFormatter,
  readFile,
  asyncRequest,
  prtgOptions,
};
