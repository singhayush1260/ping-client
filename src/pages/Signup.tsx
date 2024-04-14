import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/miscellaneous/Header";
import * as z from "zod";
import { SignUpSchema } from "@/components/forms/schemas";
import { signUp } from "@/api-client/auth-api";
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import ThemeToggle from "@/components/theme/ThemeToggle";

export type SignUpFormData={
  name:string;
  email:string;
  password:string;
}

const SignUpForm = () => {

  const navigate=useNavigate();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });

  const {mutate,isLoading,isError,error}=useMutation(signUp,{
    onSuccess:async ()=>{
        await queryClient.invalidateQueries("validateToken");
        navigate("/chats");
    },
  });  

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <main className="min-h-screen w-full flex items-center justify-center py-2 bg-coloredPattern">
      <div className="fixed right-5 top-5">
        <ThemeToggle/>
      </div>
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Login to your account" />
      </CardHeader>
      <CardContent>
      {isError && (
            <div className="w-full bg-red-100 p-1 rounded-sm text-sm font-light text-red-700">
              {/* @ts-ignore */}
              {error?.message}
            </div>
          )}
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="John Doe"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <LoaderButton label="Signup" isLoading={isLoading} loadingLabel="Signing up..." className="w-full"/>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link to="/login">Already have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
    </main>
  );
};
export default SignUpForm;