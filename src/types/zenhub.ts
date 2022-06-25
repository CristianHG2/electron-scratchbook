export type Assignee = {
  login: string;
};

export type IssueNode = {
  title: string;
  assignees: {
    nodes: Assignee[]
  };
  estimate?: {
    value: number
  };
};

export type Response = {
  workspace: {
    upcomingSprint: {
      issues: {
        nodes: IssueNode[];
      }
    }
  }
};
