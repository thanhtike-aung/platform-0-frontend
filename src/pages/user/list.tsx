import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { Search } from "lucide-react";
import People from "./people";
import { useGetFriendByUserQuery, useGetFriendRequestQuery } from "@/redux/services/friendApi";
import { decodeJWT } from "@/lib/utils";
import PeopleSkeleton from "@/components/user/peopleSkeleton";
import UnknowError from "@/components/error/unknow";
import MyFriendListSkeleton from "@/components/user/myFriendListSkeleton";
import MyFriend from "./myFriends";

const UserList = () => {
  const currentUser = decodeJWT(localStorage.getItem("access-token"));
  const { data: users, isLoading: userIsLoading } = useGetUsersQuery();
  const { data: friendRequests, isLoading: friendRequestIsLoading } =
    useGetFriendRequestQuery(currentUser.id);
  const {data: friends, isLoading: friendIsLoading} = useGetFriendByUserQuery(currentUser.id);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-300 text-white p-4 sticky top-0 z-10">
          <p className="text-2xl text-left font-bold mb-2">Friends</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search Friends"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black"
            />
          </div>
        </header>

        {/* Friends List */}
        <main className="flex-1 overflow-y-auto">
          <Tabs defaultValue="people" className="w-full pt-2">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="people">People</TabsTrigger>
              <TabsTrigger className="w-full" value="friends">My Friends</TabsTrigger>
            </TabsList>
            <TabsContent value="people">
              {userIsLoading ? (
                <PeopleSkeleton />
              ) : !users || !friends ? (
                <UnknowError />
              ) : (
                <People users={users} friends={friends}/>
              )}
            </TabsContent>
            <TabsContent value="friends">
              {friendRequestIsLoading ? (
                <MyFriendListSkeleton />
              ) : !friendRequests || !friends ? (
                <UnknowError />
              ) : (
                <MyFriend friendRequests={friendRequests} friends={friends} />
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default UserList;
