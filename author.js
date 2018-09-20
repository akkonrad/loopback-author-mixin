'use strict';

module.exports = function contentAuthor(Model, options) {

  // Set default model options that can be overriden.
  let defaultOptions = {
    authorField: 'authorId'
  };
  // Merge with current model options.
  Object.assign(defaultOptions, options);

  /**
   * Implements 'beforeRemote' hook for the create() method
   */
  Model.beforeRemote('create', async function (ctx) {
    const token = ctx.req.query.access_token;
    if (token) {
      let accessToken = await Model.app.models.AccessToken.findOne({where: {id: token}});
      ctx.args.options.authorId = accessToken.userId;
    }

  });

  /**
   * Implements 'before save' hook.
   */
  Model.observe('before save', function (ctx, next) {

    if (ctx.instance && ctx.options.authorId) {
      ctx.instance[defaultOptions['authorField']] =
        ctx.instance[defaultOptions['authorField']] || ctx.options['authorId'];
    }

    next();
  });

};
