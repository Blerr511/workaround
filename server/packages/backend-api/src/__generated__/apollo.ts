"use client"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  federation__FieldSet: { input: any; output: any; }
  join__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export enum AuthApiProviderType {
  /** email */
  Email = 'email'
}

export type AuthProvider = {
  __typename?: 'AuthProvider';
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  providers?: Maybe<Array<AuthProvider>>;
  uid: Scalars['String']['output'];
};

export type CreateOrUpdateWorkspaceInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type DeleteWorkspaceInput = {
  id: Scalars['Float']['input'];
};

export type EmailSignUpParams = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetWorkspaceInput = {
  id: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateWorkspace: Workspace;
  deleteWorkspace: OperationResult;
  emailSignUp: AuthUser;
};


export type MutationCreateOrUpdateWorkspaceArgs = {
  workspace: CreateOrUpdateWorkspaceInput;
};


export type MutationDeleteWorkspaceArgs = {
  workspace: DeleteWorkspaceInput;
};


export type MutationEmailSignUpArgs = {
  user: EmailSignUpParams;
};

export type OperationResult = {
  __typename?: 'OperationResult';
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  getWorkspace: Workspace;
  signIn: SignInResponse;
};


export type QueryGetWorkspaceArgs = {
  workspace: GetWorkspaceInput;
};


export type QuerySignInArgs = {
  cred: SignInParams;
};

export type SignInParams = {
  password: Scalars['String']['input'];
  provider: AuthApiProviderType;
  username: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  accessToken: Scalars['String']['output'];
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export enum Core__Purpose {
  /** `EXECUTION` features provide metadata necessary to for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export enum Join__Graph {
  Backend = 'BACKEND'
}

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type GetWorkspaceTitleQueryVariables = Exact<{
  workspace: GetWorkspaceInput;
}>;


export type GetWorkspaceTitleQuery = { __typename?: 'Query', getWorkspace: { __typename?: 'Workspace', name: string } };

export type GetWorkspaceQueryVariables = Exact<{
  workspace: GetWorkspaceInput;
}>;


export type GetWorkspaceQuery = { __typename?: 'Query', getWorkspace: { __typename?: 'Workspace', id: number, name: string } };


export const GetWorkspaceTitleDocument = gql`
    query getWorkspaceTitle($workspace: GetWorkspaceInput!) {
  getWorkspace(workspace: $workspace) {
    name
  }
}
    `;

/**
 * __useGetWorkspaceTitleQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceTitleQuery({
 *   variables: {
 *      workspace: // value for 'workspace'
 *   },
 * });
 */
export function useGetWorkspaceTitleQuery(baseOptions: Apollo.QueryHookOptions<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables> & ({ variables: GetWorkspaceTitleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables>(GetWorkspaceTitleDocument, options);
      }
export function useGetWorkspaceTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables>(GetWorkspaceTitleDocument, options);
        }
export function useGetWorkspaceTitleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables>(GetWorkspaceTitleDocument, options);
        }
export type GetWorkspaceTitleQueryHookResult = ReturnType<typeof useGetWorkspaceTitleQuery>;
export type GetWorkspaceTitleLazyQueryHookResult = ReturnType<typeof useGetWorkspaceTitleLazyQuery>;
export type GetWorkspaceTitleSuspenseQueryHookResult = ReturnType<typeof useGetWorkspaceTitleSuspenseQuery>;
export type GetWorkspaceTitleQueryResult = Apollo.QueryResult<GetWorkspaceTitleQuery, GetWorkspaceTitleQueryVariables>;
export const GetWorkspaceDocument = gql`
    query getWorkspace($workspace: GetWorkspaceInput!) {
  getWorkspace(workspace: $workspace) {
    id
    name
  }
}
    `;

/**
 * __useGetWorkspaceQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceQuery({
 *   variables: {
 *      workspace: // value for 'workspace'
 *   },
 * });
 */
export function useGetWorkspaceQuery(baseOptions: Apollo.QueryHookOptions<GetWorkspaceQuery, GetWorkspaceQueryVariables> & ({ variables: GetWorkspaceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, options);
      }
export function useGetWorkspaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceQuery, GetWorkspaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, options);
        }
export function useGetWorkspaceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWorkspaceQuery, GetWorkspaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, options);
        }
export type GetWorkspaceQueryHookResult = ReturnType<typeof useGetWorkspaceQuery>;
export type GetWorkspaceLazyQueryHookResult = ReturnType<typeof useGetWorkspaceLazyQuery>;
export type GetWorkspaceSuspenseQueryHookResult = ReturnType<typeof useGetWorkspaceSuspenseQuery>;
export type GetWorkspaceQueryResult = Apollo.QueryResult<GetWorkspaceQuery, GetWorkspaceQueryVariables>;