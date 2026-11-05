import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuthStore } from "../store/auth";

const RegisterPage = () => {
  const [newUser, setNewUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const { registerUser } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formBg = useColorModeValue("white", "gray.800");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { success, message } = await registerUser(newUser);

      if (!success) {
        toaster.create({
          title: "Registration Failed",
          description: message,
          type: "error",
          closable: true,
        });
      } else {
        toaster.create({
          title: "Success",
          description: "You registered successfully",
          type: "success",
          closable: true,
        });
        navigate("/login");
      }
    } catch (e) {
      toaster.create({
        title: "Error",
        description: e.message,
        type: "error",
        closable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <Container maxW="md" py={12}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Create a ShelfFlow Account
          </Heading>

          <Box
            as="form"
            onSubmit={handleSubmit}
            bg={formBg}
            p={8}
            borderRadius="lg"
            boxShadow="lg"
          >
            <VStack spacing={4}>
              <Box w="full">
                <Text mb={2} fontWeight="medium">
                  Full Name
                </Text>
                <Input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  required
                />
              </Box>

              <Box w="full">
                <Text mb={2} fontWeight="medium">
                  Email Address
                </Text>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  required
                />
              </Box>

              <Box w="full">
                <Text mb={2} fontWeight="medium">
                  Password
                </Text>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Create a password"
                  required
                />
              </Box>

              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={loading}
                loadingText="Creating account..."
              >
                Register
              </Button>

              <Button
                type="button"
                variant="outline"
                w="full"
                onClick={() => navigate("/login")}
              >
                Already have an account? Sign In
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default RegisterPage;
