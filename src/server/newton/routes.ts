import { Routes } from "../../types/newton";
import client from "../zenhub/client";
import { SprintIssueResponse, UserListResponse } from "../../types/zenhub";
import { ray } from "node-ray";

const routes: Routes = {
  Dashboard: async () => {
    const issues = (await client.gql<SprintIssueResponse>("issues")).workspace
      .upcomingSprint.issues.nodes;

    const users = (
      await client.gql<UserListResponse>("users")
    ).workspace.assignees.nodes.reduce<string[]>(
      (acc, user) => [...acc, user.login],
      []
    );

    return { users, issues };
  },
};

export default routes;
