export interface Friend {
  id: number;
  requester_id: number;
  receiver_id: number;
  status: FriendStatus;
}

export type FriendStatus = "PENDING" | "ACCEPTED" | "BLOCKED";

export interface FriendRequestArgs {
  requester: number;
  receiver: number;
}