import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  CartMain,
  CategoryMain,
  ChangePasswordMain,
  CheckoutMain,
  DefaultPage,
  Footer,
  Header,
  HelpSupportMain,
  Homepage,
  InternetOff,
  Login,
  PrivacyPolicyMain,
  ProductMain,
  ProfileMain,
  SignUp,
  WalletMain,
  WishlistListMain,
} from "../import";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          {/* Routes without header and footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Routes with header and footer */}
          <Route path="/*" element={<WithHeaderAndFooter />} />
        </Routes>
      </ErrorBoundary>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

function WithHeaderAndFooter() {
  const isLogged = localStorage.getItem('_id');
  // console.log(isLogged);

  return (
    <div className="wrapper">
      <InternetOff />
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={isLogged ? <Navigate to="/home" /> : <DefaultPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/profile" element={<ProfileMain />} />
          <Route path="/change-password" element={<ChangePasswordMain />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyMain />} />
          <Route path="/support" element={<HelpSupportMain />} />
          <Route path="/wishlist" element={<WishlistListMain />} />
          <Route path="/category" element={<CategoryMain />} />
          <Route path="/cart" element={<CartMain />} />
          <Route path="/checkout" element={<CheckoutMain />} />
          <Route path="/wallet" element={<WalletMain />} />
          <Route path="/product" element={<ProductMain />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
