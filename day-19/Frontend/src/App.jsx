import {RouterProvider} from 'react-router'
import { router } from './features/AuthRoutes'
import { AuthProvider } from './features/auth/auth.contex'
import { PostConetextProvider } from './features/posts/post.context'
import { FollowContextProvider } from './features/followFeatures/FollowContext'

const App = () => {
  return (
    <AuthProvider>
      <PostConetextProvider>
        <FollowContextProvider>
          <RouterProvider router={router} />
        </FollowContextProvider>
      </PostConetextProvider>
    </AuthProvider>
  );
}

export default App
