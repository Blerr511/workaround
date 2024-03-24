module.exports = {
  client: {
    name: "wr-core",
    service: {
      name: "gateway",
      url: "http://localhost:3300/graphql",
    },
    includes: ["src/operations/**"],
  },
};
