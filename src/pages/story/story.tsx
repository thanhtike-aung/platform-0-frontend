import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Story = () => {
  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap p-4">
        <div className="flex space-x-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-20 flex-shrink-0">
              <div className="w-20 h-32 bg-gray-300 rounded-lg overflow-hidden relative">
                <Avatar className="w-8 h-8 absolute top-2 left-2 border-2 border-blue-500">
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs mt-1 text-center">User {i + 1}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default Story;
