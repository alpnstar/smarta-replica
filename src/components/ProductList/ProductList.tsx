'use client'
import React, {FC} from "react";
import {ProductCard} from "@/components/ProductCard/ProductCard";
import './productList.scss';
import {Product} from "@/types/products";
import {ProductSort} from "@/components/ProductSort/ProductSort";
import {CatalogPagination} from "@/components/CatalogPagination/CatalogPagination";
import {Meta} from "@/types/api";

interface IProductListProps {
    products: Product[];
    meta: Meta;
}


export const ProductList: FC<IProductListProps> = ({products, meta}) => {
    return (
        <div className="products">
            <ProductSort/>
            <div className="products__wrapper ">
                {products.map((item, index) =>
                    <ProductCard key={index} product={item}/>
                )}
            </div>
            {meta.pagination.pageCount > 1 ? <CatalogPagination pageCount={meta.pagination.pageCount}/> : ''}
        </div>
    );
};