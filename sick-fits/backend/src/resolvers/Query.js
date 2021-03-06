const { forwardTo } = require("prisma-binding");
const Query = {
  //   items: forwardTo("db")
  items: async (parent, args, ctx, info) => {
    const items = await ctx.db.query.items();
    return items;
  },
  item: forwardTo("db")
};

module.exports = Query;
