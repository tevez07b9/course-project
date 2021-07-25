import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Course,
  PurchaseInput,
  PurchaseMutationVariables,
  useMeQuery,
  usePurchaseMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      creditCard: "",
    },
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [_, purchase] = usePurchaseMutation();

  React.useEffect(() => {
    if (fetching) {
    } else {
      if (!data?.me) {
        router.push("/login");
      }
    }
  }, [data]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: PurchaseInput) => {
    console.log("data: ", data);
    const inputs: PurchaseMutationVariables = {
      purchaseOptions: {
        ...data,
        courseID: course.id,
      },
    };

    const response = await purchase({
      purchaseOptions: {
        ...inputs.purchaseOptions,
      },
    });

    if (response.data?.purchase) {
      alert("course purchased");
    } else if (response.data?.purchase === null) {
      router.push("/");
    }
    setIsOpen(false);
  };

  return (
    <Box boxSize="full">
      <Image src={course.thumbnailURL} />
      <Heading size="md" mb="4">
        {course.title}
      </Heading>
      <Button onClick={() => setIsOpen(true)}>Buy</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text size="sm" mb={4}>
              Price: ${course.pirce}
            </Text>
            <form>
              <Controller
                control={control}
                name="creditCard"
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    mb={4}
                    {...field}
                    isInvalid={error ? true : false}
                    placeholder="1111 1111 1111 1111"
                  />
                )}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(onSubmit)}>
              Buy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CourseCard;
