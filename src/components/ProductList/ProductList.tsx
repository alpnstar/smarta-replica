import React, {FC} from "react";
import {ProductCard} from "@/components/ProductCard/ProductCard";
import './productList.scss';
import {Product} from "@/types/products";
import {ProductSort} from "@/components/ProductSort/ProductSort";

interface IProductListProps {
    products: Product[];
}


export const ProductList: FC<IProductListProps> = ({products}) => {

    return (
        <div className="products">
            <ProductSort/>
            <div className="products__wrapper ">
                {products.map((item, index) =>
                    <ProductCard key={index} product={item}/>
                )}
            </div>
        </div>
    );
};