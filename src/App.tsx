import { Link, Outlet } from 'react-router-dom'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <div>
      <Link to="/" className="link-danger link-underline-opacity-50 fs-4">
        Go to home page
      </Link>
      <Outlet />
    </div>
  )
}

export default App
