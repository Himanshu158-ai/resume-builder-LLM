import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/builder" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}