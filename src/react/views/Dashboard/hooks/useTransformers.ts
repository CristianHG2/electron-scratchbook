import { IssueNode } from "../../../../types/zenhub";
import {
  AssigneePoints,
  DashboardComponentProps,
} from "../../../../types/dashboard";

const pointsPerAssignee = (assignees: DashboardComponentProps["assignees"]) =>
  Object.entries(assignees).reduce<AssigneePoints[]>(
    (acc, [assignee, issues]) => [
      ...acc,
      {
        name: assignee,
        value: issues.reduce(
          (acc, issue) => acc + ((issue.estimate ?? {}).value ?? 0),
          0
        ),
      },
    ],
    []
  );

const getChartData = (issues: IssueNode[]) => {
  const pointSummary = pointsPerAssignee(groupByAssignees(issues)).filter(
    (a) => a.value > 0
  );
  const totalAssigned = pointSummary.reduce((acc, p) => acc + p.value, 0);
  const totalPoints = issues.reduce((s, i) => s + (i.estimate?.value ?? 0), 0);
  return [
    ...pointSummary,
    { name: "None", value: totalPoints - totalAssigned },
  ];
};

const groupByAssignees = (issues: IssueNode[]) =>
  issues.reduce<Record<string, IssueNode[]>>((acc, issue) => {
    issue.assignees.nodes.forEach((assignee) => {
      acc[assignee.login] = [...(acc[assignee.login] ?? []), issue];
    });

    return acc;
  }, {});

const useTransformers = () => ({
  getChartData,
  pointsPerAssignee,
  groupByAssignees,
});
export default useTransformers;
