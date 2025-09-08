//axios - perform HTTP requests like GET , POST , PUT, DELETE 
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
  }


  export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  };

  export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  };

  export const getAuthUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      console.log("Error in getAuthUser:", error);
      return null;
    }
  };

 

  export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onboard", userData);
    return response.data;
  };  

  export const googleLogin = async (userData) => {
  const response = await axiosInstance.post("/auth/google-login", userData);

  if (response.data.token) {
    localStorage.setItem("google_jwt", response.data.token);
  }

  return response.data;
};
 

  export const forgotPassword = async (userData) => {
    const response = await axiosInstance.post("/auth/forgot-password", userData);
    return response.data;
  };

  export const resetPassword = async (token, userData) => {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, userData);
    return response.data;
  }; 

  
// Fetch all products with optional query filters
export const getProducts = async () => {
  const response = await axiosInstance.get("/items"); // always get all
  return response.data;
};




// Create a new product (admin/protected)
export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/items", productData);
  return response.data;
};

// Update a product
export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/items/${id}`, productData);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/items/${id}`);
  return response.data;
};


// Get logged-in user's cart
export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

// Add item to cart
export const addToCart = async (itemId, quantity = 1) => {
  const response = await axiosInstance.post("/cart/add", { itemId, quantity });
  return response.data;
};

// Update quantity of a cart item
export const updateCartItem = async (itemId, quantity) => {
  const response = await axiosInstance.put("/cart/update", { itemId, quantity });
  return response.data;
};

// Remove an item from cart
export const removeCartItem = async (itemId) => {
  const response = await axiosInstance.delete(`/cart/remove/${itemId}`);
  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart/clear");
  return response.data;
};
