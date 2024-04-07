import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Toaster } from "@/components/ui/toaster";
// import { MapContextProvider } from "./context/MapContext.tsx";
import { SidebarContextProvider } from "./context/SidebarContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthContextProvider>
            <SidebarContextProvider>
            <App />
            </SidebarContextProvider>
            <Toaster />
          </AuthContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
