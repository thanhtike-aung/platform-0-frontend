import { ReactNode } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface RemovableImageContainerProps {
  children: ReactNode;
  onRemove: () => void;
}

const RemovableImageContainer = ({
  children,
  onRemove,
}: RemovableImageContainerProps) => {
  return (
    <>
      <div className="relative pt-2">
        {children}
        <Button
          variant="ghost"
          className="absolute top-[10px] right-[162px] w-10 h-10 !rounded-full p-1"
          onClick={onRemove}
        >
          <X />
        </Button>
      </div>
    </>
  );
};

export default RemovableImageContainer;
