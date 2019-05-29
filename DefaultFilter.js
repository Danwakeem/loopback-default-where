module.exports = (Model, options) => {
  Model.observe("access", (ctx, next) => {
    if (options && typeof options === "object") {
      Object.keys(options).forEach(key => {
        const value = options[key];
        if (
          !ctx.query ||
          (ctx.query && JSON.stringify(ctx.query).indexOf(key) === -1)
        ) {
          if (!ctx.query) ctx.query = {};
          ctx.query[key] = value;
        }
      });
    }

    next();
  });
};
