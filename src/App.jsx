import ScrollToTop from "./components/ui/ScrollToTop";
import PublicRoutes from "./routes/publicRoutes";
import AdminRoutes from "./routes/adminRoutes";

function App() {
  return (
    <>
      <ScrollToTop />
      
      <PublicRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;