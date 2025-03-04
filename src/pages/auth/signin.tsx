import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation } from "@/redux/services/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginRequest } from "@/types/auth/common";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";

const LoginForm = () => {
  const [token, setToken] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<LoginRequest>();
  const [loginMutation, { isSuccess, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    const { email, password } = data;
    if (!email && !password) return;
    try {
      const response = await loginMutation({
        email,
        password,
      }).unwrap();
      setToken(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isSuccess || !token) return;
    dispatch(login(token));
    navigate("/");
  }, [isSuccess, token, navigate]);

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm space-y-6 bg-white rounded-lg p-6 shadow-sm">
        {/* Header */}
        <header className="text-center mb-8">
          <p className="text-2xl font-bold text-gray-600">Platform 0</p>
        </header>

        {/* Login Form */}
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                {...register("email")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                {...register("password")}
              />
            </div>
          </div>

          {isLoading ? (
            <Button className="w-full !bg-black" disabled>
              <Loader2 className="animate-spin" />
              Signing In
            </Button>
          ) : (
            <Button type="submit" className="w-full !bg-black">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </form>

        {/* Additional Options */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <Separator className="my-4" />
          <span className="px-2 text-gray-500 text-sm">Or continue with</span>

          <div className="grid grid-cols-2 gap-4 mt-3.5">
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                />
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
