import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Image, Video, Smile } from "lucide-react";
import { useState } from "react";
import { useCreatePostMutation } from "@/redux/services/postApi";

const PostCreate = () => {
  const [content, setContent] = useState<string>("");
  const [createPostMutation] = useCreatePostMutation();

  const createPost = async () => {
    if (!content) return;
    try {
      await createPostMutation({
        content: content,
        published: true,
        author_id: 1,
      }).unwrap();
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="w-full h-screen max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">John Doe</span>
      </CardHeader>
      <CardContent className="p-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind, John?"
          className="min-h-[100px] text-lg"
        />
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Image className="w-5 h-5" />
            Photo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Video className="w-5 h-5" />
            Video
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Smile className="w-5 h-5" />
            Feeling
          </Button>
        </div>
        <Button className="!bg-blue-600 w-full" onClick={createPost}>
          Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCreate;
