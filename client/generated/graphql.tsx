import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Float'];
  title: Scalars['String'];
  thumbnailURL: Scalars['String'];
  pirce: Scalars['Float'];
  videoLink: Array<Scalars['String']>;
  purchases?: Maybe<Array<Purchase>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CourseInput = {
  title: Scalars['String'];
  thumbnailURL: Scalars['String'];
  price: Scalars['Float'];
  videoLink: Array<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createCourse?: Maybe<Course>;
  purchase?: Maybe<Purchase>;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  options: CourseInput;
};


export type MutationPurchaseArgs = {
  options: PurchaseInput;
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['Float'];
  userID: Scalars['Float'];
  courseID: Scalars['Float'];
  credicard: Scalars['String'];
  paymetstatus: Scalars['String'];
  user: User;
  course: Course;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PurchaseInput = {
  courseID: Scalars['Float'];
  creditCard: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
  listCourse?: Maybe<Array<Course>>;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  purchases?: Maybe<Array<Purchase>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PurchaseMutationVariables = Exact<{
  purchaseOptions: PurchaseInput;
}>;


export type PurchaseMutation = (
  { __typename?: 'Mutation' }
  & { purchase?: Maybe<(
    { __typename?: 'Purchase' }
    & Pick<Purchase, 'id' | 'courseID' | 'userID' | 'credicard' | 'paymetstatus' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id' | 'username'>
    ), course: (
      { __typename?: 'Course' }
      & Pick<Course, 'title' | 'thumbnailURL' | 'pirce'>
    ) }
  )> }
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type ListCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCoursesQuery = (
  { __typename?: 'Query' }
  & { listCourse?: Maybe<Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'title' | 'thumbnailURL' | 'pirce' | 'videoLink' | 'createdAt' | 'updatedAt'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const PurchaseDocument = gql`
    mutation Purchase($purchaseOptions: PurchaseInput!) {
  purchase(options: $purchaseOptions) {
    id
    courseID
    userID
    credicard
    paymetstatus
    user {
      email
      id
      username
    }
    course {
      title
      thumbnailURL
      pirce
    }
    createdAt
    updatedAt
  }
}
    `;

export function usePurchaseMutation() {
  return Urql.useMutation<PurchaseMutation, PurchaseMutationVariables>(PurchaseDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      username
      email
      id
      createdAt
      updatedAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ListCoursesDocument = gql`
    query ListCourses {
  listCourse {
    id
    title
    thumbnailURL
    pirce
    videoLink
    createdAt
    updatedAt
  }
}
    `;

export function useListCoursesQuery(options: Omit<Urql.UseQueryArgs<ListCoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListCoursesQuery>({ query: ListCoursesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};