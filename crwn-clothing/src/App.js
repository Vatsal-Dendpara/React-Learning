import Home from "./router/home/home.component";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "./router/navigations/navigation.component";
import Authentication from "./router/authentication/authentication.component";
import Shop from "./router/shop/shop.component.jsx";
import Checkout from "./router/checkout/checkout.component";
import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.util";
import { setCurrentUser } from "./store/user/user.reducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const response = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      const pickedValues =
        user && (({ email, accessToken }) => ({ accessToken, email }))(user);
      dispatch(setCurrentUser(pickedValues));
    });
    return response;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
