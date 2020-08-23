const util = require('util')
const exec = util.promisify(require('child_process').exec)
const resolveCurlResponse = require('./resolveCurlResponse')
const debug = require('debug')('study-http:jest:curl:index')
 
module.exports = async function(str){
  const curlString = str
  debug('%s start', str)
  // 参考 https://stackoverflow.com/questions/3252851/how-to-display-request-headers-with-command-line-curl
  const { stdout, stderr } = await exec(curlString + ` 2>&1 | sed '/^* /d; /not shown]$/d; /bytes data]$/d; s/> //; s/< //'`)
  debug('%s stdout \n%O ', str, stdout)
  debug('%s stderr \n%O', str, stderr)
  return resolveCurlResponse(stdout, stderr)
}

