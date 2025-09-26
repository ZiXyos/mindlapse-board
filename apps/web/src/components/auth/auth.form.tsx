import {type FunctionComponent} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/components/ui/form";
import { Input } from "@shared/ui/components/ui/input";
import { Button } from "@shared/ui/components/ui/button";
import { useAuth } from "../../hooks/api/useAuth";
import { useCurrentUser } from "../../hooks/api/useCurrentUser";
import { useEffect } from "react";
import type { LoginCredentials } from "@mindboard/shared";

export const LoginForm: FunctionComponent = () => {
  const { login, isLoginLoading, loginError } = useAuth();
  const { isAuthenticated } = useCurrentUser();
  const navigate = useNavigate();

  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" disabled={isLoginLoading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" disabled={isLoginLoading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoginLoading}>
          {isLoginLoading ? "Signing in..." : "Login"}
        </Button>

        {loginError && (
          <div className="text-sm text-red-600 mt-2">
            {loginError.message || "Login failed. Please try again."}
          </div>
        )}
      </form>
    </Form>
  );
};
