import React, { useState } from "react";
import HomePage from "./HomePage";
import BugFinder from "./BugFinder";
import CodingTips from "./CodingTips"; // <-- create this page

export default function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home", "checker", "tips"

  const goToChecker = () => setCurrentPage("checker");
  const goToHome = () => setCurrentPage("home");
  const goToTips = () => setCurrentPage("tips");  // <-- handle Tips page

  return (
    <>
      {currentPage === "home" && <HomePage onStart={goToChecker} onTips={goToTips} />}
      {currentPage === "checker" && <BugFinder goToHome={goToHome} />}
      {currentPage === "tips" && <CodingTips goToHome={goToHome} />} {/* Tips page */}
    </>
  );
}
