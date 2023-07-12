import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="p-8 lg:px-48 md:px-10 min-h-screen overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
