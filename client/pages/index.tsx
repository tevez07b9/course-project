import { Box, Button, Grid, Heading, Input, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import CourseCard from "../components/CourseCard";
import { useListCoursesQuery } from "../generated/graphql";

export default function Home() {
  const router = useRouter();
  const [{ data, fetching }] = useListCoursesQuery();

  return (
    <Layout>
      <Grid mt={4} templateColumns="repeat(4, 1fr)" gap={6}>
        {fetching ? (
          <Text size="xl">Loading</Text>
        ) : (
          <>
            {data?.listCourse?.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </>
        )}
      </Grid>
    </Layout>
  );
}
