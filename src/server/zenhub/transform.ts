import { IssueNode, Response } from "../../../types/zenhub";

export default (payload: Response) => {
  const issues = payload.workspace.upcomingSprint.issues.nodes;

  return {
    perAssignee: () =>
      issues.reduce<Record<string, IssueNode[]>>((acc, issue) => {
        issue.assignees.nodes.forEach((assignee) => {
          acc[assignee.login] = [...(acc[assignee.login] ?? []), issue];
        });

        return acc;
      }, {}),

    issues: () => issues,
  };
};
