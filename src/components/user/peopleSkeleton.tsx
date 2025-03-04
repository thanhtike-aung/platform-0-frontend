import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const users = new Array(8).fill(null);

const PeopleSkeleton = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow space-y-3">
      {users.map((_, index) => (
        <Card
          key={index}
          className="flex items-center justify-between p-3 border-b last:border-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </Card>
      ))}
    </div>
  );
};

export default PeopleSkeleton;
