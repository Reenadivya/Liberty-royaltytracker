import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

// Load the environment variables from the `.env` file
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    replace({
      // Define environment variables to replace
      "process.env.REACT_APP_API_KEY": JSON.stringify(
        process.env.REACT_APP_API_KEY
      ),
    }),
  ],
  // Other configuration options
});
