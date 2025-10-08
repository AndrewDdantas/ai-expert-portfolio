import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "localhost",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Make environment variables available to the client
      "import.meta.env.VITE_API_TOKEN": JSON.stringify(env.VITE_API_TOKEN),
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
  };
});
