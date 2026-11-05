// frontend/src/pages/LoginPage.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formBg = useColorModeValue("white", "gray.800");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Save user data and token to localStorage so the app remembers you're logged in
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Redirect to home page
      navigate("/");
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
            Sign In to ShelfFlow
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
                  Email Address
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </Box>

              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={loading}
                loadingText="Logging in..."
              >
                Sign In
              </Button>

              <Button
                type="button" // Important: not "submit", so it doesn't trigger form validation
                variant="outline" // Gives it a clean, secondary look
                w="full"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default LoginPage;
