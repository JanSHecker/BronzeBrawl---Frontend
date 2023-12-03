import { createRoot } from "react-dom/client";
import React from "react";
import Router from "./Router";

// const App = () => {
//   return (
//     <div className="min-h-screen max-h-screen flex flex-col items-center justify-between p-5 ">
//       <StatusPage />
//     </div>
//   );
// };

// const FrontPage = () => {
//   return (
//     <>
//       <img
//         src="./bronzeIcon150.png"
//         alt="bronze brawl with icon"
//         className="mb-8 max-w-full h-auto"
//       />
//       {/* <NameForm /> */}
//     </>
//   );
// };
document.documentElement.classList.remove("dark");
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
