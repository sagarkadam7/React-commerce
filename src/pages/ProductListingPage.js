import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Alert,
  Button,
  Fab,
  Zoom,
  Fade,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";

import { getProducts, getCategories } from "../api/fakeStoreApi";
import Header from "../components/layout/Header";
import CartDrawer from "../components/layout/CartDrawer";
import ProductCard from "../components/products/ProductCard";
import Footer from "../components/layout/Footer";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import { SnackbarProvider } from "../components/common/NotificationSnackbar";

function ProductListingPage() {
  const snackbarRef = React.useRef();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [categories, setCategories] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Fetch all products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsResponse = await getProducts();
        const categoriesResponse = await getCategories();
        setAllProducts(productsResponse.data);
        setCategories(["all", ...categoriesResponse.data]);
        setFilteredProducts(productsResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          "Failed to load products or categories. Please try again later."
        );
        if (snackbarRef.current) {
          snackbarRef.current.show(
            "Failed to load data. Please check your connection.",
            "error"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter & Sort
  useEffect(() => {
    let currentProducts = [...allProducts];

    // Category filter
    if (selectedCategory !== "all") {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentProducts = currentProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Sorting
    currentProducts.sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(currentProducts);
  }, [allProducts, searchTerm, selectedCategory, sortOrder]);

  // Show/hide scroll to top button
  const handleScroll = useCallback(() => {
    setShowScrollToTop(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShopNowClick = () => {
    const section = document.getElementById("products-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header
          onCartClick={() => setIsCartDrawerOpen(true)}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOrder}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortOrder={sortOrder}
          categories={categories}
        />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <LoadingSkeleton />
        </Container>
        <Footer />
        <CartDrawer
          open={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
        />
        <SnackbarProvider ref={snackbarRef} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header
          onCartClick={() => setIsCartDrawerOpen(true)}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOrder}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortOrder={sortOrder}
          categories={categories}
        />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
        <Footer />
        <CartDrawer
          open={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
        />
        <SnackbarProvider ref={snackbarRef} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        onCartClick={() => setIsCartDrawerOpen(true)}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOrder}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        categories={categories}
      />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "primary.light",
          color: "white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
          background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
          mb: 4,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ color: "black", fontWeight: 700, fontSize: "2.5rem" }}
          >
            Explore Deals. Discover Trends. Shop Smart
          </Typography>
          <Typography variant="h6" sx={{ color: "#343a40", mb: 3 }}>
            Discover amazing products at unbeatable prices.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 20,
              px: 4,
              py: 1.5,
              color: "#FFD700", // Moved color to sx prop for cleaner styling
            }}
            onClick={handleShopNowClick}
          >
            Shop Now!
          </Button>
        </Container>
      </Box>

      {/* Product Section */}
      <Container
        id="products-section"
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, flexGrow: 1 }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 2 }}
        >
          Our Latest Collection
        </Typography>

        {/* Product count */}
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </Typography>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <Fade in={true}>
            <Box sx={{ textAlign: "center", mt: 8, color: "text.secondary" }}>
              <SearchIcon sx={{ fontSize: 80, mb: 2, color: "grey.500" }} />
              <Typography variant="h6">No products found.</Typography>
              <Typography variant="body1">
                Try adjusting your search, filters, or sort order.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortOrder("default");
                }}
              >
                Reset Filters
              </Button>
            </Box>
          </Fade>
        )}

        {/* Products Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product, index) => (
            <Zoom
              in={true}
              key={product.id}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            </Zoom>
          ))}
        </Grid>
      </Container>

      <Footer />
      <CartDrawer
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
      <SnackbarProvider ref={snackbarRef} />

      {/* Go to Top Button */}
      <Zoom in={showScrollToTop}>
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}

export default ProductListingPage;
