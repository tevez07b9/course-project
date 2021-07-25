import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export const Layout: React.FC<{}> = ({ children }) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutLoading }, logout] = useLogoutMutation();

  let body = null;

  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutLoading}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Box mt={8} mx="auto" maxW={"800px"} w="100%">
      <Flex bg="gray.300" p={4}>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
      {children}
    </Box>
  );
};
