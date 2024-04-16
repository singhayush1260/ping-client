import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense} from "react";
import { useAuthContext } from "./context/AuthContext";
import FallbackPage from "@/pages/FallbackPage";

const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Chat= lazy(() => import("@/pages/Chat"));
const Chats= lazy(() => import("@/pages/Chats"));
const App = () => {

const { isLoggedIn} = useAuthContext();
  return (
    <div className="h-screen">
      <Suspense fallback={<FallbackPage />}>
        <Routes>
          <Route path="/"  element={isLoggedIn ? <Chats/>  : <Login />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
          />
           <Route
            path="/chats"
            element={isLoggedIn ? <Chats /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat/:chatId"
            element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};
export default App;