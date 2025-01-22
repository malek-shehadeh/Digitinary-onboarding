import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import FrontEnd from "./pages/Front-End";
import CoWorkersPage from "./pages/CoworkersPage"; 
import ArenaPage from "./pages/arenaPage";
import './App.css'
import ChatBot from "./components/ChatBot/ChatBot";
// import ChatBot from "../src/components/ChatBot/ChatBot";


const BackEndPage = () => <h2>Back-End Department</h2>;
const QAPage = () => <h2>Quality Assurance</h2>;
const HRPage = () => <h2>Human Resource</h2>;
const UIUXPage = () => <h2>UI/UX Designer</h2>;
const FinancePage = () => <h2>Financial Officer</h2>;
const ProductManagerPage = () => <h2>Product Manager</h2>;

function App() {
  return(
    <Router>
      <Navbar/>
      <Sidebar />
    <div className=' '>
      <Routes>
          <Route path="/" element={<h2>Welcome to the Digitinary</h2>} />
          <Route path="/front-end" element={<FrontEnd />} />
          <Route path="/back-end" element={<BackEndPage />} />
          <Route path="/qa" element={<QAPage />} />
          <Route path="/hr" element={<HRPage />} />
          <Route path="/ui-ux" element={<UIUXPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/product-manager" element={<ProductManagerPage />} />
          <Route path="/co-workers" element={<CoWorkersPage />} />
          <Route path="/arena" element={<ArenaPage />} />
          </Routes>
          <ChatBot />

    </div>
    </Router>
  )
}

export default App
