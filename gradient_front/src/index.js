import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Categories from "./pages/Categories";
import Tasks from "./pages/Tasks";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);