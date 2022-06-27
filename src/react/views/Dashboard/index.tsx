import React, { Fragment, useEffect } from "react";
import { Box, Divider, Flex, Heading, HStack } from "@chakra-ui/react";
import ZenHubIssue from "./ZenHubIssue";
import DistributionChart from "./DistributionChart";
import { DashboardComponentProps } from "src/types/dashboard";
import useTransformers from "./hooks/useTransformers";
import useDashboardStore from "./hooks/useDashboardStore";

export default (props: DashboardComponentProps) => {
  const { issues, setIssues, setUsers } = useDashboardStore();
  const { getChartData } = useTransformers();

  useEffect(() => {
    setIssues(props.issues);
    setUsers(props.users);
  }, [props.issues, props.users]);

  const chartData = getChartData(issues);

  return (
    <Box maxW="7xl" p={8} m="auto" mt={12}>
      <Heading variant="primary">Workload Dashboard</Heading>
      <Divider my={6} />

      <HStack spacing={4}>
        <Flex grow={1} justify="center" align="middle">
          <DistributionChart chartData={chartData} />
        </Flex>
        <Flex maxW="md" flexDir="column" maxH="md" overflow="auto">
          {issues.map((issue) => (
            <Fragment key={issue.title}>
              <ZenHubIssue issue={issue} />
            </Fragment>
          ))}
        </Flex>
      </HStack>
    </Box>
  );
};
