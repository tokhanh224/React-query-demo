import LayOutAdmin from "@/components/Layout/Layout";
import ProductAdd from "@/components/Product/ProductAdd";
import ProductEdit from "@/components/Product/ProductEdit";
import ProductList from "@/components/Product/ProductList";
import SignIn from "@/components/User/SignIn";
import SignUp from "@/components/User/SignUp";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return <Routes>
        <Route element={<LayOutAdmin/>}>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/Add" element={<ProductAdd/>}/>
            <Route path="/Edit/:id" element={<ProductEdit/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>

        </Route>
    </Routes>;
};
export default Router;
