import React, { useEffect } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";

import { Container, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const iconColor = useColorModeValue("gray.800", "white");
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Navbar />
      <Container>
        <VStack spacing={8}>
          <Text
            fontSize={{ base: "22", sm: "28" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            color={iconColor}
          >
            Current Products
          </Text>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
            gap={10}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>

          {products.length === 0 && (
            <Stack
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color="gray.500"
            >
              No products found{" "}
              <Link
                to={"/create"}
                style={{ color: "#3182ce", textDecoration: "underline" }}
              >
                Create a product
              </Link>
            </Stack>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default HomePage;


// Note: use this for design reference: https://apidog.com/blog/what-is-shadcn-ui/