import React, { useState } from "react";
import { Box, Divider, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { IssueNode } from "../../types/zenhub";
import AssigneeBtn from "../components/AssigneeBtn";

export default ({ assignees }: { assignees: Record<string, IssueNode[]> }) => {
  const [openAssignee, setOpenAssignee] = useState<string | null>(null);
  const names = Object.keys(assignees);
  const issues = openAssignee ? assignees[openAssignee] : [];

  const onAssigneeSelect = (assignee: string) => {
    console.log(assignee);
    setOpenAssignee(assignee);
  };

  return (
    <Box maxW="5xl" p={8} m="auto" mt={12}>
      <Heading variant="primary">Sprint Assignments</Heading>
      <Divider my={6} />

      <HStack spacing={10}>
        <Box>
          <VStack spacing={4} w="2xs">
            {names.map((name) => (
              <AssigneeBtn
                key={name}
                name={name}
                onClick={() => onAssigneeSelect(name)}
              />
            ))}
          </VStack>
        </Box>
        <Flex grow={1}>
          {!openAssignee ? (
            <Heading size="md" textAlign="center" w="100%">
              Please select an assignee.
            </Heading>
          ) : (
            <Box>{JSON.stringify(issues)}</Box>
          )}
        </Flex>
      </HStack>
    </Box>
  );
};
