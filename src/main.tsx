import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { Toaster } from "@/components/ui/toaster";
import { SidebarContextProvider } from "./context/SidebarContext.tsx";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <ErrorBoundary>
   <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthContextProvider>
            <SocketContextProvider>
            <SidebarContextProvider>
            <App />
            </SidebarContextProvider>
            </SocketContextProvider>
            <Toaster />
          </AuthContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
   </ErrorBoundary>
  </React.StrictMode>
);
