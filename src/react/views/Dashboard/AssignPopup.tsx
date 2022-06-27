import React, { FC } from "react";
import { FCParent } from "../../../types/react";
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToken,
} from "@chakra-ui/react";
import { IssueNode } from "../../../types/zenhub";
import useDashboardStore from "./hooks/useDashboardStore";

const AssignPopup: FCParent<{ issue: IssueNode }> = ({ children, issue }) => {
  const users = useDashboardStore((state) => state.users);
  const assignIssue = useDashboardStore((state) => state.assignIssueToUser);
  const [gray, gray200] = useToken("colors", ["gray.100", "gray.50"]);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Assign Issue</PopoverHeader>
        <PopoverBody>
          <Box maxH="3xs" overflow="auto">
            {users.map((user) => (
              <Box
                cursor="pointer"
                key={user}
                p={2}
                my={1}
                rounded="md"
                _hover={{ backgroundColor: gray200 }}
                border={`1px solid ${gray}`}
                onClick={() => assignIssue(issue, user)}
              >
                {user}
              </Box>
            ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AssignPopup;
