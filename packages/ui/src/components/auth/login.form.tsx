import {type FunctionComponent} from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/components/ui/form";
import { Input } from "@shared/ui/components/ui/input";
import { Button } from "@shared/ui/components/ui/button";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: FunctionComponent = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

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
                <Input type="email" placeholder="Enter your email" {...field} />
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
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  );
};
