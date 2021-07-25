import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { LoginMutationVariables, useLoginMutation } from "../generated/graphql";

export default function Login() {
  const router = useRouter();
  const [_, login] = useLoginMutation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginMutationVariables) => {
    console.log("data: ", data);
    const response = await login({
      password: data.password,
      usernameOrEmail: data.usernameOrEmail,
    });
    if (response.data?.login.errors) {
      alert(response.data.login.errors);
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  return (
    <Layout>
      <Heading size="xl" mb="6">
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="usernameOrEmail"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              mb={4}
              {...field}
              isInvalid={error ? true : false}
              placeholder="username or email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              mb={4}
              isInvalid={error ? true : false}
              placeholder="password"
              type="password"
            />
          )}
        />

        <Button type="submit">Login</Button>
      </form>
    </Layout>
  );
}
