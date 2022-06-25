import { GraphQLClient } from "graphql-request";

const token = process.env.ZENHUB_TOKEN;
const client = new GraphQLClient("https://api.zenhub.com/public/graphql", {
  headers: { Authorization: `Bearer ${token}` },
});

export default client;
