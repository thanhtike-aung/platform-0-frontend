import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/utils";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from "@/redux/services/friendApi";
import { userApi } from "@/redux/services/userApi";
import { FriendStatus } from "@/types/friend/common";
import { FriendRequest, User } from "@/types/user/common";
import { Clock, MoreHorizontal } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

interface MyFriendProps {
  friendRequests: FriendRequest[];
  friends: { status: FriendStatus; data: User }[];
}
interface friendRequestProps {
  friendRequests: FriendRequest[];
}
interface friendProps {
  friends: { status: FriendStatus; data: User }[];
}

const MyFriend: React.FC<MyFriendProps> = ({ friendRequests, friends }) => {
  return (
    <>
      <FriendRequests friendRequests={friendRequests} />
      <FriendsList friends={friends} />
    </>
  );
};

const FriendRequests: React.FC<friendRequestProps> = ({ friendRequests }) => {
  const dispatch = useDispatch();
  const [useAcceptFriendRequest] = useAcceptFriendRequestMutation();
  const [useDeclineFriendRequest] = useDeclineFriendRequestMutation();
  const handleAcceptRequest = async (
    requesterId: number,
    receiverId: number
  ) => {
    try {
      await useAcceptFriendRequest({
        requester: requesterId,
        receiver: receiverId,
      }).unwrap();

      // force refetch all users data
      dispatch(userApi.util.invalidateTags(["User"]));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeclineRequest = async (
    requesterId: number,
    receiverId: number
  ) => {
    try {
      await useDeclineFriendRequest({
        requester: requesterId,
        receiver: receiverId,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="container max-w-md mx-auto text-left">
        <div className="px-4 py-3 border-b">
          <h2 className="text-xl font-semibold">Friend Requests</h2>
          <p className="text-sm text-muted-foreground">
            {friendRequests.length} requests
          </p>
        </div>

        <ScrollArea>
          <div className="divide-y">
            {friendRequests.map((request) => (
              <div key={request.id} className="p-4 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="https://temp4pj.s3.ap-southeast-1.amazonaws.com/A-01.jpg"
                      alt={request.requester.name}
                    />
                    <AvatarFallback>{request.requester.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold truncate pr-2">
                        {request.requester.name}
                      </h2>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          {timeAgo(request.created_at.toString())}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      * mutual friends
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 !bg-black"
                    onClick={() =>
                      handleAcceptRequest(
                        request.requester_id,
                        request.receiver_id
                      )
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() =>
                      handleDeclineRequest(
                        request.requester_id,
                        request.receiver_id
                      )
                    }
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

const FriendsList: React.FC<friendProps> = ({ friends }) => {
  const onlyFriends = friends.filter((friend) => friend.status === "ACCEPTED");
  return (
    <>
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-semibold">
          Friends · {onlyFriends.length}
        </h2>
      </div>

      <div className="grid gap-2">
        {onlyFriends.map((friend) => (
          <div
            key={friend.data.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 sm:h-10 sm:w-10">
                  <AvatarImage
                    src="https://temp4pj.s3.ap-southeast-1.amazonaws.com/A-01.jpg"
                    alt={friend.data.name}
                  />
                  <AvatarFallback>{friend.data.name}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="font-medium">{friend.data.name}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFriend;
