'use strict';

module.exports = function contentAuthor(Model, options) {

  // Set default model options that can be overriden.
  var defaultOptions = {
    authorField: 'authorId',
  };

  // Merge with current model options.
  Object.assign(defaultOptions, options);

  Model.observe('before save', function event(ctx, next) {
    const authorId = ctx.options.accessToken.userId;
    if (ctx.instance) {
      ctx.instance[defaultOptions.authorField] = authorId;
    } else {
      ctx.data[options.authorField] = authorId;
    }
    next();
  });
};