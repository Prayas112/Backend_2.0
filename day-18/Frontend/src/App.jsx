import AppRoutes from "./AppRoutes"
import { AuthProvider } from "./features/auth/auth.contex"

const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App
