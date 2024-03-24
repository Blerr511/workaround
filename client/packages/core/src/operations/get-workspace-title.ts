import { gql } from "@apollo/client";

export const GQL_GET_WORKSPACE_TITLE = gql`
  query getWorkspaceTitle($workspace: GetWorkspaceInput!) {
    getWorkspace(workspace: $workspace) {
      name
    }
  }
`;
