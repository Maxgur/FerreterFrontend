import { ProductList } from "../components/ProductList/ProductList";

export function Productos({url}){
    return(
        <>
            <ProductList url={url}/>
        </>
    )
}