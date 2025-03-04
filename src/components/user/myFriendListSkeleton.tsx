import { Skeleton } from "../ui/skeleton";

const MyFriendListSkeleton = () => {
  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20 mt-1" />
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-1 p-1 border-b last:border-0"
          >
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-40 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFriendListSkeleton;
