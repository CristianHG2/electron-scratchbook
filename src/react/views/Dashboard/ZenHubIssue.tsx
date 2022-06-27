import React, { FC } from "react";
import { IssueNode } from "../../../types/zenhub";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import AssignPopup from "./AssignPopup";

const ZenHubIssue: FC<{ issue: IssueNode }> = ({ issue }) => {
  const assignee = (issue.assignees.nodes[0] ?? {}).login;
  const estimate = issue.estimate?.value ?? 0;

  const promptAssign = () => {
    console.log("click");
  };

  return (
    <Flex
      key={issue.title}
      borderBottom="1px solid rgba(0,0,0,.1)"
      py={3}
      align="middle"
      gap={2}
      flexDir="column"
    >
      <Text
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
        textAlign="left"
      >
        <Badge mr={2}>{estimate}</Badge>
        {issue.title}
      </Text>
      <Box>
        <AssignPopup issue={issue}>
          <Badge
            colorScheme={assignee ? "blue" : undefined}
            onClick={promptAssign}
            cursor="pointer"
          >
            {assignee ?? "N/A"}
          </Badge>
        </AssignPopup>
      </Box>
    </Flex>
  );
};

export default ZenHubIssue;
