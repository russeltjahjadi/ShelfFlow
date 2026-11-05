// frontend/src/components/Navbar.jsx
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { Link, useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const iconColor = useColorModeValue("gray.800", "white");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user info from localStorage
    localStorage.removeItem("userInfo");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          background={"linear-gradient(to right, #22d3ee, #3b82f6)"}
          backgroundClip={"text"}
          color={"transparent"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={3} alignItems={"center"}>
          <Button
            as={Link}
            to={"/create"}
            bg={"transparent"}
            color={iconColor}
            _hover={{ bg: "gray.200" }}
          >
            <CiSquarePlus fontSize={20} />
          </Button>

          <ColorModeButton />

          <Button
            onClick={handleLogout}
            bg={"transparent"}
            color={iconColor}
            _hover={{ bg: "red.100", color: "red.600" }}
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <IoLogOutOutline fontSize={20} />
            Logout
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;