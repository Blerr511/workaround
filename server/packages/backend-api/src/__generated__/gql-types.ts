import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
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
