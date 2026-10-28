import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box minH={"100vh"} bg={bg}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>} />
        
      </Routes>
    </Box>
  );
}

export default App;
