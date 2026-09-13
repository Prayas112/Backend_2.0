import {router }from "./auth.routes"
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
