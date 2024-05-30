import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { CartMain, CategoryMain, ChangePasswordMain, CheckoutMain, DefaultPage, Footer, Header, HelpSupportMain, Homepage, Login, PrivacyPolicyMain, ProductMain, ProfileMain, SignUp, Walletmain, WishlistListMain } from '../import';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function App() {
//  refreshAccessToken()


  return (
    <>

   
    <Routes>
      {/* Routes without header and footer */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      

      {/* Routes with header and footer */}
      <Route path='/*' element={<WithHeaderAndFooter />} />
    </Routes>
    <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

function WithHeaderAndFooter() {
  const [isLogged, setIsLogged] = useState(false);
// const location = useLocation();
const user = useSelector((store) => store.Authentication.UserAuthLogin);

useEffect(() => {
  if (user && user.data) {
    setIsLogged(true);
  } else {
    setIsLogged(false);
  }
}, [user]);
  return (
    <div className="wrapper">
      <Header />
      <Routes>
      {isLogged ?  <Route path='/' element={<Homepage />} /> :  <Route path='/' element={<DefaultPage />} /> }
        {/* <Route path='/' element={<DefaultPage />} />  */}
        {/* <Route path='/' element={<Homepage />} /> */}
        <Route path='/profile' element={<ProfileMain/>}/>
        <Route path='/change-password' element={<ChangePasswordMain/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicyMain/>}/>
        <Route path='/support' element={<HelpSupportMain/>}/>
        <Route path='/wishlist' element={<WishlistListMain/>}/>
        <Route path='/category' element={<CategoryMain/>}/>
        <Route path='/cart' element={<CartMain/>}/>
        <Route path='/checkout' element={< CheckoutMain/>}/>
        <Route path='/wallet' element={<Walletmain/>}/>
        <Route path='/product' element={<ProductMain/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
