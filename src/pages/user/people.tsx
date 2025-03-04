import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { decodeJWT } from "@/lib/utils";
import { useAddFriendMutation } from "@/redux/services/friendApi";
import { PeopleProps } from "@/types/user/common";
import {
  ArrowRightToLine,
  MessageCircle,
  ScanEye,
  UserRoundPlus,
} from "lucide-react";
import React from "react";

const People: React.FC<PeopleProps> = ({ users, friends }) => {
  const currentUser = decodeJWT(localStorage.getItem("access-token"));
  const [addFriendMutation] = useAddFriendMutation();

  const isAlreadyFriend = (userId: number) => {
    return friends?.find(
      (friend) => friend.data.id === userId && friend.status === "ACCEPTED"
    );
  };

  const isPendingFriend = (userId: number) => {
    return friends?.find(
      (friend) => friend.data.id === userId && friend.status === "PENDING"
    );
  };

  const handleRequestFriend = async (receiverId: number) => {
    try {
      await addFriendMutation({
        requester: currentUser.id,
        receiver: receiverId,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ul className="divide-y divide-gray-200">
        {users.map((user: any) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 bg-white"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.profile.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{user.name}</span>
            </div>
            {currentUser.id === user.id ? (
              <Button variant="ghost" size="icon">
                <ScanEye />
              </Button>
            ) : isAlreadyFriend(user.id) ? (
              <Button variant="ghost" size="icon">
                <MessageCircle />
              </Button>
            ) : isPendingFriend(user.id) ? (
              <Button variant="ghost" size="icon" disabled>
                <ArrowRightToLine />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRequestFriend(user.id)}
              >
                <UserRoundPlus />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default People;
