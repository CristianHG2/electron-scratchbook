import create from "zustand";
import { IssueNode } from "../../../../types/zenhub";
import { DashboardStore } from "../../../../types/dashboard";

const useDashboardStore = create<DashboardStore>((set) => ({
  issues: [],
  users: [],

  setIssues: (issues: IssueNode[]) => set({ issues }),
  setUsers: (users: string[]) => set({ users }),

  assignIssueToUser: (issue: IssueNode, user: string) =>
    set((state) => {
      const issues = [...state.issues];
      const idx = issues.findIndex((iss) => issue.title === iss.title);
      issues[idx].assignees.nodes = [{ login: user }];

      return { issues };
    }),
}));

export default useDashboardStore;
