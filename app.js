const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const routes = require('./routes')
const { auth_url,access_token,user_info } = require('./services/alipay')
const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', (ctx, next) => {
  // ctx.body = 'Hello World'
  const state = {
    title: 'Koa2'
  }
  ctx.body = { state }
})

router.post('/api/auhRedirect', (ctx, next) => {
  ctx.body = {
    auth_url
  } 
})


routes(router)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
