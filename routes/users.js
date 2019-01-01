module.exports =  (router) => {
  router.get('/user', async (ctx, next) => {
    ctx.body = 'this a users response!';
  })
}
