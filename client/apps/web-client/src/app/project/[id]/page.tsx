"use client";

import { Client } from "@/features/apollo/apollo-client";
import { useGetWorkspaceQuery } from "@wr/core";
import { NextPage } from "next";

export interface ProjectIdPageProps {
  params: {
    id: string;
  };
}

const ProjectIdPage: NextPage<ProjectIdPageProps> = ({
  params,
}: ProjectIdPageProps) => {
  const { data, loading, error } = useGetWorkspaceQuery({
    variables: { workspace: { id: parseInt(params.id) } },
    client: Client,
  });

  return (
    <div>
      <h1>Edit project</h1>
      {loading && "loading"}
      {error && JSON.stringify(error)}
      {data && JSON.stringify(error)}
    </div>
  );
};

export default ProjectIdPage;
