const routes = module.exports = require('next-routes')();

routes
  .add('ico')
  .add('main')
  .add('about')
  .add('help')
  .add('me')
  .add('likes')
  .add('ads')
  .add('shops')
  .add('/shops/:shop', 'shop')
  .add('new_ad')
  .add('/edit_ad/:ad', 'edit_ad')
  .add('search')
  .add('landing')
  .add('not_found')
  .add('/users/:user', 'user')

  .add('/:category', 'category')
  .add('/:category/:subcategory', 'subcategory')
  .add('/:category/:subcategory/ad/:ad', 'ad')
