import { Button, Heading, Input } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import {
  RegisterInput,
  RegisterMutationVariables,
  useRegisterMutation,
} from "../generated/graphql";

export default function Register() {
  const router = useRouter();
  const [_, register] = useRegisterMutation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    console.log("data: ", data);
    const inputs: RegisterMutationVariables = {
      options: data,
    };
    const response = await register({
      options: {
        ...inputs.options,
      },
    });
    if (response.data?.register.errors) {
      alert(response.data.register.errors);
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <Layout>
      <Heading size="xl" mb="6">
        Register
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              mb={4}
              {...field}
              isInvalid={error ? true : false}
              placeholder="username"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              mb={4}
              isInvalid={error ? true : false}
              placeholder="email"
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

        <Button type="submit">Register</Button>
      </form>
    </Layout>
  );
}
