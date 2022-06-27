import { IssueNode } from "./zenhub";

export type DashboardComponentProps = {
  users: string[];
  issues: IssueNode[];
};

export type DashboardStore = {
  issues: IssueNode[];
  users: string[];
  setIssues: (issues: IssueNode[]) => void;
  setUsers: (users: string[]) => void;
  assignIssueToUser: (issue: IssueNode, user: string) => void;
};

export type AssigneePoints = { name: string; value: number };
