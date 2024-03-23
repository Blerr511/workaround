import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { Component, FC } from "react";
import { C } from "../../utils/registerComponents";

export interface ProjectItemProps {
  id: number;
  title: string;
  updatedAt: Date;
}

export const ProjectItem: FC<ProjectItemProps> = ({ id, title, updatedAt }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      maxW="sm"
      borderColor="gray.200"
      _hover={{ bg: "gray.50" }}
    >
      <C.Link href={`/project/${id}`}>
        <Text fontSize="xl" fontWeight="semibold">
          {title}
        </Text>
      </C.Link>
      <Text color="gray.500" fontSize="sm">
        Last updated: {updatedAt.toLocaleString()}
      </Text>
    </Box>
  );
};
