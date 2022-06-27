export type Assignee = {
  login: string;
};

export type IssueNode = {
  title: string;
  assignees: {
    nodes: Assignee[];
  };
  estimate?: {
    value: number;
  };
};

export type Workspace<T> = {
  workspace: T;
};

export type SprintIssueResponse = Workspace<{
  upcomingSprint: {
    issues: {
      nodes: IssueNode[];
    };
  };
}>;

export type UserListResponse = Workspace<{
  assignees: {
    nodes: { login: string }[];
  };
}>;

export type Client = {
  gql: <T>(file: string) => Promise<T>;
};
