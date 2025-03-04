import PostList from "@/pages/post/list";
import Story from "./story/story";
import NewPost from "./post/new";

const Home = () => {
  return (
    <>
      <main className="flex-1 overflow-y-auto">
        {/* Stories */}
        <Story />

        {/* Create Post */}
        <NewPost />

        {/* Posts */}
        <PostList />
      </main>
    </>
  );
};

export default Home;
