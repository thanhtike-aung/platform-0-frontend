import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import RemovableImageContainer from "@/components/RemovableImageContainer";
import { useRegisterMutation } from "@/redux/services/authApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

// validation
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    passwordConfirmation: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    avatar: z.any().optional(),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    work: z.string().min(2, {
      message: "Work must be at least 2 characters.",
    }),
    relationship: z.enum(
      ["single", "married", "in_relationship", "complicated"],
      {
        message: "Please select a valid relationship status.",
      }
    ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match!",
    path: ["passwordConfirmation"],
  });

const RegistrationForm = () => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const [registerMutation, { isLoading, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      avatar: "",
      address: "",
      work: "",
      relationship: "single",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewAvatar(URL.createObjectURL(file));
    setAvatar(file);
  };

  const handleRemoveImage = () => {
    setPreviewAvatar(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.avatar = avatar;
    try {
      await registerMutation({
        name: values.name,
        email: values.email,
        password: values.password,
        profile: {
          avatar: values.avatar,
          address: values.address,
          work: values.work,
          relationship: values.relationship,
        },
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isSuccess) return;
    toast.success(
      <div className="text-left">
        <h3 className="font-bold">Registered successfully</h3>
        <p>You'll be redirected to login page shortly!</p>
      </div>,
      {
        onClose: () => {
          navigate("/login");
        },
        autoClose: 5000,
      }
    );
  }, [isSuccess]);

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        closeOnClick={false}
        rtl={false}
        transition={Bounce}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md p-6">
          <h2 className="px-5 text-2xl">Sign up your free account</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Profile picture</FormLabel>
                    {!previewAvatar ? (
                      <FormControl>
                        <Input
                          type="file"
                          {...field}
                          accept="image/"
                          onChange={handleFileChange}
                        />
                      </FormControl>
                    ) : (
                      <RemovableImageContainer onRemove={handleRemoveImage}>
                        <img
                          src={previewAvatar}
                          alt="preview avatar"
                          className="w-[150px] h-[150px] rounded"
                        />
                      </RemovableImageContainer>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="work"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Work</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Relationship</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select your relationship status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="rs">In a relationship</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="complicated">complicated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <Button className="w-full !bg-black" disabled>
                  <Loader2 className="animate-spin" /> Processing
                </Button>
              ) : (
                <Button type="submit" className="w-full !bg-black">
                  Register
                </Button>
              )}
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default RegistrationForm;
