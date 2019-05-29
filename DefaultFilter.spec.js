const sandbox = require("sinon").createSandbox();
const defaultFilter = require("./DefaultFilter");

describe("defaultFilter", () => {
  let Model;
  let observe;
  let next;
  beforeEach(() => {
    next = sandbox.spy();
    Model = {
      observe: (key, cb) => {
        observe = sandbox.spy(cb);
      }
    };
  });

  afterEach(() => sandbox.restore());

  it("should ignore options if options are not set", () => {
    defaultFilter(Model);
    const ctx = {};
    observe(ctx, next);

    Object.keys(ctx).length.should.equal(0);
    sandbox.assert.calledOnce(next);
  });

  it("should not error on empty object", () => {
    defaultFilter(Model, {});
    const ctx = {};
    observe(ctx, next);

    Object.keys(ctx).length.should.equal(0);
    sandbox.assert.calledOnce(next);
  });

  it("should set query options", () => {
    defaultFilter(Model, { limit: 10 });
    const ctx = {};
    observe(ctx, next);

    Object.keys(ctx).length.should.equal(1);
    Object.keys(ctx.query).length.should.equal(1);
    ctx.query.limit.should.equal(10);
    sandbox.assert.calledOnce(next);
  });

  it("should add options to query", () => {
    defaultFilter(Model, { limit: 10 });
    const ctx = { query: { offset: 10 } };
    observe(ctx, next);

    ctx.query.should.deepEqual({
      limit: 10,
      offset: 10
    });
    sandbox.assert.calledOnce(next);
  });

  it("should not override query keys with options", () => {
    defaultFilter(Model, { limit: 100 });
    const ctx = { query: { limit: 10 } };
    observe(ctx, next);

    ctx.query.should.deepEqual({
      limit: 10
    });
    sandbox.assert.calledOnce(next);
  });

  it("should add a query if it does not exist", () => {
    defaultFilter(Model, { limit: 100 });
    const ctx = {};
    observe(ctx, next);

    ctx.query.should.deepEqual({
      limit: 100
    });
    sandbox.assert.calledOnce(next);
  });
});
