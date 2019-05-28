const util = require("util");
const defaultFilter = require("./src/index");

module.exports = util.deprecate(
  app => app.loopback.modelBuilder.mixins.define("DefaultFilter", defaultFilter),
  "DEPRECATED: Use mixinSources, see https://github.com/clarkbw/loopback-ds-timestamp-mixin#mixinsources"
);
