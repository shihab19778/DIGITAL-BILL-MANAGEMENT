import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;