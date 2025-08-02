import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search"; // Import Search icon
import SortIcon from "@mui/icons-material/Sort"; // Import Sort icon (not directly used, but good for context)

import { useCart } from "../../context/CartContext"; // Import your custom useCart hook

// This Header component now accepts props for search, category, and sort controls
function Header({
  onCartClick,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  searchTerm,
  selectedCategory,
  sortOrder,
  categories,
}) {
  const { totalQuantity } = useCart(); // Get the total quantity of items from your cart context

  return (
    <AppBar position="sticky">
      {" "}
      {/* AppBar positions itself at the top and stays there on scroll */}
      <Toolbar sx={{ flexWrap: "wrap", py: { xs: 1, sm: 0 } }}>
        {" "}
        {/* Allow items to wrap on small screens */}
        {/* Application Title */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            mb: { xs: 1, sm: 0 },
            minWidth: { xs: "100%", sm: "auto" },
            fontWeight: 700,
            letterSpacing: 1.2,
            fontFamily: '"Poppins", "Roboto", sans-serif',
            color: "yellow",
            textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          SwiftCommerce
        </Typography>
        {/* Search Bar */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)} // Callback for search term changes
          sx={{
            minWidth: { xs: "100%", sm: "200px", md: "250px" }, // Responsive width
            mr: { xs: 0, sm: 2 }, // Margin right
            mb: { xs: 1, sm: 0 }, // Margin bottom on small screens
            backgroundColor: "rgba(255,255,255,0.1)", // Slightly transparent background
            borderRadius: 8, // Rounded corners
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "transparent" }, // Hide default border
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" }, // Border on hover
              "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
              color: "#343a40", // Text color
            },
            "& .MuiInputBase-input": { color: "#343a40" }, // Input text color
            "& .MuiInputLabel-root": { color: "#343a40" }, // Label color
            "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: "#343a40" }, // Icon color
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Category Filter */}
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: "150px" },
            mr: { xs: 0, sm: 2 },
            mb: { xs: 1, sm: 0 },
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
        >
          <InputLabel id="category-select-label" sx={{ color: "black" }}>
            Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)} // Callback for category changes
            label="Category"
            sx={{
              color: "#343a40",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": { color: "white" }, // Dropdown arrow color
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {/* Map through fetched categories */}
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                {/* Capitalize first letter */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Sort Order */}
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: "150px" },
            mr: { xs: 0, sm: 2 },
            mb: { xs: 1, sm: 0 },
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
        >
          <InputLabel id="sort-select-label" sx={{ color: "black" }}>
            Sort By
          </InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)} // Callback for sort order changes
            label="Sort By"
            sx={{
              color: "#343a40",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="name-asc">Name: A-Z</MenuItem>
            <MenuItem value="name-desc">Name: Z-A</MenuItem>
          </Select>
        </FormControl>
        {/* Cart Icon and Badge */}
        <IconButton
          color="inherit"
          onClick={onCartClick}
          aria-label="show shopping cart"
          sx={{ ml: { xs: 0, sm: "auto" } }}
        >
          <Badge badgeContent={totalQuantity} color="secondary">
            {" "}
            {/* Badge shows the number of items */}
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
