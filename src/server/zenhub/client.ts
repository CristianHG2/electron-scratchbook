import { GraphQLClient } from "graphql-request";
import { Client } from "../../types/zenhub";
import * as requests from "./graphql";
import { ray } from "node-ray";

const token = process.env.ZENHUB_TOKEN;

const client = new GraphQLClient("https://api.zenhub.com/public/graphql", {
  headers: { Authorization: `Bearer ${token}` },
});

const gql: Client["gql"] = (file: string) =>
  // @ts-ignore
  client.request(requests[file].default);

export default {
  ...client,
  gql,
};
