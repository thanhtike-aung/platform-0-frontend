import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FriendList = () => {
  const friends = [
    { id: 1, name: "John Doe", image: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Jane Smith", image: "/placeholder.svg?height=40&width=40" },
    {
      id: 3,
      name: "Alice Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Bob Williams",
      image: "/placeholder.svg?height=40&width=40",
    },
    { id: 5, name: "Emma Brown", image: "/placeholder.svg?height=40&width=40" },
  ];

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
          <ul className="divide-y divide-gray-200">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="flex items-center justify-between p-4 bg-white"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={friend.image} alt={friend.name} />
                    <AvatarFallback>
                      {friend.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{friend.name}</span>
                </div>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default FriendList;
