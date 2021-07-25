import { Box, Button, Grid, Heading, Input } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  return (
    <Layout>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Box w="100%" h="10" bg="blue.500" />
        <Box w="100%" h="10" bg="blue.500" />
        <Box w="100%" h="10" bg="blue.500" />
        <Box w="100%" h="10" bg="blue.500" />
      </Grid>
    </Layout>
  );
}
