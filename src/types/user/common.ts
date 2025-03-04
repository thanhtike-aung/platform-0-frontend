import { FriendStatus } from "../friend/common";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profile: Profile;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  avatar?: any;
  address?: string;
  work?: string;
  relationship?: Relationship;
}

export type Relationship =
  | "single"
  | "in_relationship"
  | "married"
  | "complicated";

export interface PeopleProps {
  users: User[];
  friends: { status: FriendStatus, data: User }[];
}

export interface FriendRequest {
  id: number;
  requester: User;
  requester_id: number;
  receiver_id: number;
  status: FriendStatus;
  created_at: Date;
}
