import Home from "./router/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./router/navigations/navigation.component";
const Shop = () => {
  return <h1>This is shop page</h1>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
