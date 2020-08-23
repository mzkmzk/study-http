const curl = require('../curl/index')
/**
 * 考点 后端服务器如何设置cookie
 */
it('服务器如何设置cookie', async function(){
  const { status, body, row, stdout, stderr } = await curl(`curl -vs -H 'Host: study-http.404mzk.com' http://47.115.81.18:9500/set-cookie`)
  expect(row).toMatchSnapshot()
  
  //expect(stdout + stderr).toMatchSnapshot()
})