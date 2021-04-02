export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Admin = {
  readonly __typename?: 'Admin';
  readonly _id: Scalars['ID'];
  readonly email: Scalars['String'];
  readonly name: Scalars['String'];
  readonly role: AdminRole;
};

/** 어드민 권한 종류 */
export enum AdminRole {
  EDITOR = 'EDITOR',
  SUPERVISOR = 'SUPERVISOR'
}

export type ChangeStoryStateInput = {
  readonly id: Scalars['ID'];
};


export type LoginInput = {
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly approveStoryById: Story;
  readonly createStory: Story;
  readonly login: Scalars['String'];
  readonly register: Admin;
  readonly rejectStoryById: Story;
};


export type MutationapproveStoryByIdArgs = {
  input: ChangeStoryStateInput;
};


export type MutationcreateStoryArgs = {
  newStory: newStoryInput;
};


export type MutationloginArgs = {
  input: LoginInput;
};


export type MutationregisterArgs = {
  input: RegisterInput;
};


export type MutationrejectStoryByIdArgs = {
  input: ChangeStoryStateInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly getAllStories: ReadonlyArray<Story>;
  readonly getStoriesForAdmin: ReadonlyArray<Story>;
  readonly getStoryById: Story;
};


export type QuerygetAllStoriesArgs = {
  filter?: Maybe<StoryFilter>;
};


export type QuerygetStoriesForAdminArgs = {
  filter: StoryFilterForAdmin;
};


export type QuerygetStoryByIdArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  readonly email: Scalars['String'];
  readonly name: Scalars['String'];
  readonly password: Scalars['String'];
  readonly role?: Maybe<AdminRole>;
};

export type Story = {
  readonly __typename?: 'Story';
  readonly _id: Scalars['ID'];
  readonly approvedAt?: Maybe<Scalars['DateTime']>;
  readonly censoredAt?: Maybe<Scalars['DateTime']>;
  readonly content: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly index?: Maybe<Scalars['Int']>;
  readonly rejectedAt?: Maybe<Scalars['DateTime']>;
  readonly state: StoryState;
};

export type StoryFilter = {
  readonly limit?: Maybe<Scalars['Int']>;
  readonly offset?: Maybe<Scalars['Int']>;
};

export type StoryFilterForAdmin = {
  readonly limit?: Maybe<Scalars['Int']>;
  readonly offset?: Maybe<Scalars['Int']>;
  readonly state?: Maybe<StoryState>;
};

/** 이야기의 상태 */
export enum StoryState {
  APPROVED = 'APPROVED',
  CENSORED = 'CENSORED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type newStoryInput = {
  readonly content: Scalars['String'];
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly state?: Maybe<StoryState>;
};
