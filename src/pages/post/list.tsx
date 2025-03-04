import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetPostsQuery } from "@/redux/services/postApi";
import { MoreHorizontal } from "lucide-react";
import { decodeJWT, timeAgo } from "@/lib/utils";
import { useEffect } from "react";

const PostList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) return;
    const userData = decodeJWT(token);
  }, []);

  if (isLoading) return <p>loading...</p>;
  if (error) return <pre>error</pre>;
  if (!posts) return <p>...</p>;
  return (
    <>
      {posts.map((post: any, i: number) => (
        <Card key={i} className="mx-4 mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{post.author.name}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-left">{post.author.name}</h3>
                <p className="text-sm text-gray-500">
                  {timeAgo(post.created_at)}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save post</DropdownMenuItem>
                <DropdownMenuItem>Hide post</DropdownMenuItem>
                <DropdownMenuItem>Unfollow User {i + 1}</DropdownMenuItem>
                <DropdownMenuItem>Report post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p className="text-left">{[post.content]}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" className="w-full">
              👍 Like
            </Button>
            <Button variant="ghost" size="sm" className="w-full">
              💬 Comment
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default PostList;
