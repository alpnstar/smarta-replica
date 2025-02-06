'use client';
import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CatalogFilterSection} from "@/components/CatalogFilters/CatalogFilterSection/CatalogFilterSection";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import qs from "qs";
import {IAndFilter, IFilters, IOrFilter} from "@/types/catalogFilters";
import {getBrands, getModels} from "@/store/slices/filtersSlice";


export const CatalogFilters: FC = () => {
    const [brandsParams, setBrandsParams] = useState<IOrFilter>({});
    const [modelParams, setModelParams] = useState<IOrFilter>({});
    const [priceParams, setPriceParams] = useState<IAndFilter>({});
    const [searchParams, setSearchParams] = useState<IFilters>();
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    useEffect(() => {
        if (startPrice || endPrice) {
            setPriceParams({
                $and: [
                    {
                        'price': {
                            $gte: startPrice,
                            $lte: endPrice,
                        }
                    }
                ],
            });

        }
    }, [startPrice, endPrice]);
    useEffect(() => {
        if (brandsParams['$or'] || modelParams['$or'] || priceParams['$and']) {
            setSearchParams(() => {
                const newParams = {
                    filters: {
                        $and: [
                            brandsParams,
                            modelParams,
                            priceParams
                        ]
                    }
                }
                router.push('/catalog/smartphones?' + qs.stringify(newParams, {
                    encodeValuesOnly: true, // prettify URL
                }));
                return newParams;
            })

        }
    }, [brandsParams, modelParams, priceParams]);

    const router = useRouter();
    const brands = useAppSelector(state => state.filtersReducer.brands);
    const models = useAppSelector(state => state.filtersReducer.models);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getModels());
    }, []);

    return (
        <div className="catalog__filters">
            <h1>Каталог</h1>
            <CatalogFilterSection filterLabel={'brand_id'} title={'Бренд'} items={brands} params={brandsParams}
                                  setParams={setBrandsParams}/>
            <CatalogFilterSection params={modelParams} title={'Модель'} filterLabel={'model_id'} items={models}
                                  setParams={setModelParams}/>
            <div className="catalog__filters-price">
                <input type="text" value={startPrice} onChange={(e) => setStartPrice(e.target.value)}/>
                <input type="text" value={endPrice} onChange={(e) => setEndPrice(e.target.value)}/>
            </div>

        </div>


    );
};



