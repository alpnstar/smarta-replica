import React, {FC} from "react";
import {CatalogFilters} from "@/components/CatalogFilters/CatalogFilters";
import {ProductList} from "@/components/ProductList/ProductList";
import './catalog.scss';
import {ApiResponse} from "@/types/api";
import {Product} from "@/types/products";

interface CatalogProps {
    params: any,
    searchParams?: string,
}

async function getData(searchParams: string, params: any = {}) {
    const paramsTemplate = `${params['brand'] ? 'filters[brand_id]=' + params['brand'] : ''}${params['model'] ? '&filters[model_id]=' + params['model'] : ''}`;
    const searchParamsTemplate = searchParams ? '&' + searchParams : '';
    const response = await fetch('http://localhost:1337/api/products?populate=image&' + paramsTemplate + searchParamsTemplate,
        {
            cache: 'no-cache',

        });
    return await response.json() as Promise<ApiResponse<Product[]>>;
}

export const Catalog: FC<CatalogProps> = async ({params, searchParams}) => {
    const data = await getData(searchParams || '', params);
    return (
        <div className={"catalog"}>
            <div className="catalog__wrapper container">
                <aside>
                    <CatalogFilters/>
                </aside>
                {data.data ? <ProductList products={data.data}/> : 'Ничего не найдено'}
            </div>
        </div>
    );
};