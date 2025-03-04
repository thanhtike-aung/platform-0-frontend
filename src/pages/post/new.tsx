import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreatePostMutation } from "@/redux/services/postApi";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

const NewPost = () => {
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
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Card className="mx-4 mb-4">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Input
            placeholder="What's on your mind?"
            className="flex-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardHeader>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button variant="ghost" size="sm">
            📷 Photo
          </Button>
          <Button variant="ghost" size="sm" onClick={createPost}>
            <SendHorizonal />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default NewPost;
