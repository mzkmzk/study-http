const curl = require('../curl/index')

// 内容为: 123456789ABCDEF
/**
 * 考点: 分段请求资源, 例如`Range: bytes=1-3`这种形式请求资源
 */
it('多点续传 训练1', async () => {
  const { status, body, row } = await curl(`curl -vs -H 'Range: bytes=1-3' -H 'Host: study-http.404mzk.com' http://47.115.81.18:9500/test.log`)

  expect(status).toBe(206)
  expect(body).toBe('234')
  expect(row).toMatchSnapshot()
})

/**
 * 考点: 分段请求资源, `10-`表示从第11个字节开始获取之后的内容
 */
it('多点续传 训练2', async () => {
  const { status, body, row} = await curl(`curl -vs -H 'Range: bytes=10-' -H 'Host: study-http.404mzk.com' http://47.115.81.18:9500/test.log`)

  expect(status).toBe(206)
  expect(body).toBe('BCDEF')
  expect(row).toMatchSnapshot()
})

/**
 * 考点: 分段请求资源, `10-`表示从第11个字节开始获取之后的内容
 */
it('多点续传 训练3', async () => {
  const { status, body, row } = await curl(`curl -vs -H 'Range: bytes=-3' -H 'Host: study-http.404mzk.com' http://47.115.81.18:9500/test.log`)

  expect(status).toBe(206)
  expect(body).toBe('DEF')
  expect(row).toMatchSnapshot()
})

/**
 * 考点: 多段传输的内容返回, 和最后一个boundary以--结束
 */
it('多点续传 训练4', async () => {
  const { status, body, row } = await curl(`curl -vs -H 'Range: bytes=0-0,10-11' -H 'Host: study-http.404mzk.com' http://47.115.81.18:9500/test.log`)

  expect(status).toBe(206)
  //expect(body).toBe('234')
  //思考 考点为内容填写和
  expect(row).toMatchSnapshot()
})

/**
 * 考点: 下载过程中以If-Match确认片段包是否仍有效
 */
it('多点续传 训练5', async () => {
  const { status, body, row} = await curl(`curl -vs -H 'Range: bytes=0-0' -H 'If-Match: "error-etag"' -H 'Host: study-http.404mzk.com' http://47.115.81.18:9500/test.log`)

  expect(status).toBe(412)
  //expect(body).toBe('234')
  expect(row).toMatchSnapshot()
})


