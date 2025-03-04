import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  UserPlus,
  MoreHorizontal,
  Briefcase,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { decodeJWT } from "@/lib/utils";

const Profile = () => {
  const token = localStorage.getItem("access-token");
  const userProfile = decodeJWT(token);

  return (
    <>
      {!userProfile ? (
        <h1>unknown error occurs. please login again!</h1>
      ) : (
        <Card className="w-full h-screen max-w-md mx-auto overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <img
                src="/cover.jpg"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <Avatar className="absolute -bottom-16 left-4 w-32 h-32 border-4 border-white">
                <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="pt-20 px-4">
            <p className="text-3xl text-left font-bold">{userProfile.name}</p>
            <p className="text-muted-foreground text-left">1.5K friends</p>
            <div className="flex -space-x-2 overflow-hidden mt-2">
              {[...Array(5)].map((_, i) => (
                <Avatar
                  key={i}
                  className="inline-block border-2 border-background"
                >
                  <AvatarImage
                    src={`/friend-${i + 1}.jpg`}
                    alt={`Friend ${i + 1}`}
                  />
                  <AvatarFallback>{`F${i + 1}`}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4 px-4 py-6">
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Friend
              </Button>
              <Button variant="secondary" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex text-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Works at Acme Inc.
              </div>
              <div className="flex text-sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                Studied at University of Technology
              </div>
              <div className="flex text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                Lives in New York, USA
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Profile;
