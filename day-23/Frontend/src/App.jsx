import { router } from "./auth.routes";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/Song.Context";

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  );
}

export default App;
