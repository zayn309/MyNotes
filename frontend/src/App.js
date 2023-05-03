import React from "react";
import "./App.css";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route exact path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
