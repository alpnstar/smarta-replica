'use client';
import React, {FC, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {filtersActions, getBrands, getModels} from "@/store/slices/filtersSlice";
import {CatalogFilterBrandsSection} from "@/components/CatalogFilterBrandsSection/CatalogFilterBrandsSection";
import qs from "qs";
import {IAndFilter, IOrFilter} from "@/types/catalogFilters";
import {CatalogFilterModelsSection} from "@/components/CatalogFilterModelsSection/CatalogFilterModelsSection";
import {SecondButton} from "@/components/UI/SecondButton/SecondButton";

function isIOrFilter(filter: any): filter is IOrFilter {
    return "$or" in filter;
}

function isIAndFilter(filter: any): filter is IAndFilter {
    return "$and" in filter;
}

export const CatalogFilters: FC = () => {
    const searchParams = useSearchParams();
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');

    const router = useRouter();
    const brandsParams = useAppSelector(state => state.filtersReducer.brandsParams);
    const modelParams = useAppSelector(state => state.filtersReducer.modelsParams);
    const brands = useAppSelector(state => state.filtersReducer.brandsData);
    const models = useAppSelector(state => state.filtersReducer.modelsData);
    const generatedSearchParams = useAppSelector(state => state.filtersReducer.generatedSearchParams);
    useEffect(() => {
        generatedSearchParams !== null && router.push('/catalog/smartphones' + '?' + generatedSearchParams)
    }, [generatedSearchParams]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getModels());
    }, []);
    useEffect(() => {
        const params: any = {
            $and: [],
        };


        if (startPrice || endPrice) {
            params.$and.push({});
            params.$and[0]['price'] = {};
            if (startPrice) params.$and[0]['price']['$gte'] = startPrice;
            if (endPrice) params.$and[0]['price']['$lte'] = endPrice;
        }

        dispatch(filtersActions.setPriceParams(params));

    }, [startPrice, endPrice]);
    useEffect(() => {
        if (searchParams) {
            const parsedSearchParams: any = qs.parse(searchParams.toString());
            const parsed: any = parsedSearchParams;
            const parsedFilters = parsed.filters;

            if (parsed.pagination) {
                dispatch(filtersActions.setPageParam(+parsed.pagination.page))
            }
            if (parsed.sort) {
                dispatch(filtersActions.setSortParam(parsed.sort[0]));
            }
            if (parsedFilters?.$and) {
                parsedFilters.$and.forEach((item:any) => {
                    if (isIOrFilter(item)) {
                        if (item.$or.some(el => 'brand_id' in el)) {
                            dispatch(filtersActions.setBrandsParams(item));
                        }
                        if (item.$or.some(el => 'model_id' in el)) {
                            dispatch(filtersActions.setModelsParams(item));
                        }
                    }
                    if (isIAndFilter(item)) {
                        const priceFilter = item.$and.find((el: any) => 'price' in el);
                        if (priceFilter && !Array.isArray(priceFilter) && typeof priceFilter === 'object') {
                            if ('price' in priceFilter && typeof priceFilter.price === 'object') {
                                setStartPrice(priceFilter.price['[$gte]'] ?? '');
                                setEndPrice(priceFilter.price['[$lte]'] ?? '');
                            }
                        }
                    }
                });
            }


        }
    }, []);

    function clearFilters() {
        dispatch(filtersActions.setBrandsParams({$or: []},));
        dispatch(filtersActions.setModelsParams({$or: []},));
        setStartPrice('');
        setEndPrice('');
    }

    return (
        <div className="catalog__filters">
            <h1>Каталог</h1>

            <span className="catalog__filters-title">
                <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="19.25" y="0.400024" width="1.4" height="19" rx="0.7" transform="rotate(90 19.25 0.400024)"
                      fill="#2f324d"></rect>
                <rect x="16.25" y="4.80005" width="1.4" height="13" rx="0.7" transform="rotate(90 16.25 4.80005)"
                      fill="#2f324d"></rect>
                <rect x="12.25" y="9.20001" width="1.4" height="5" rx="0.7" transform="rotate(90 12.25 9.20001)"
                      fill="#2f324d"></rect>
            </svg>
                Фильтры
            </span>
            <CatalogFilterBrandsSection title={'Бренд'} items={brands}
            />
            <CatalogFilterModelsSection title={'Модель'}
                                        items={models}/>
            <span className="catalog__filters-filter-title">Цена</span>
            <div className="catalog__filters-price">
                <div className="catalog__filters-price-input catalog__filters-price-input--start">
                    <span className="catalog__filters-price-title">от</span>
                    <input placeholder={'от 16 990 ₽'} type="text" value={startPrice}
                           onChange={(e) => setStartPrice(e.target.value)}/>
                </div>
                <div className="catalog__filters-price-input catalog__filters-price-input--end">
                    <span className="catalog__filters-price-title">до</span>
                    <input placeholder={'до 209 990 ₽'} type="text" value={endPrice}
                           onChange={(e) => setEndPrice(e.target.value)}/>
                </div>
            </div>
            {brandsParams.$or.length !== 0 || modelParams.$or.length !== 0 || startPrice !== '' || endPrice !== '' ?
                <SecondButton fontSize={'16px'} padding={'16px 32px'} onClick={clearFilters}>Очистить
                    фильтр</SecondButton> : ''
            }

        </div>


    );
};


// 'use client';
// import React, {FC, useEffect, useState} from "react";
// import {useRouter, useSearchParams} from "next/navigation";
// import {useAppDispatch, useAppSelector} from "@/store/hooks";
// import qs from "qs";
// import {IAndFilter, IFilters, IOrFilter} from "@/types/catalogFilters";
// import {getBrands, getModels} from "@/store/slices/filtersSlice";
// import {CatalogFilterBrandsSection} from "@/components/CatalogFilterBrandsSection/CatalogFilterBrandsSection";
// import {CatalogFilterModelsSection} from "@/components/CatalogFilterModelsSection/CatalogFilterModelsSection";
// import {SecondButton} from "@/components/UI/SecondButton/SecondButton";
//
// function isIOrFilter(filter: any): filter is IOrFilter {
//     return "$or" in filter;
// }
//
// function isIAndFilter(filter: any): filter is IAndFilter {
//     return "$and" in filter;
// }
//
// export const CatalogFilters: FC = () => {
//     const [brandsParams, setBrandsParams] = useState<IOrFilter>({$or: []});
//     const [modelParams, setModelParams] = useState<IOrFilter>({$or: []});
//     const [priceParams, setPriceParams] = useState<IAndFilter>({$and: []});
//     const searchParams = useSearchParams();
//     const [startPrice, setStartPrice] = useState('');
//     const [endPrice, setEndPrice] = useState('');
//     useEffect(() => {
//         if (searchParams) {
//             const parsedSearchParams: any = qs.parse(searchParams.toString());
//             const parsed: IFilters = parsedSearchParams;
//             const parsedFilters = parsed.filters;
//
//             if (parsedFilters?.$and) {
//                 parsedFilters.$and.forEach((item) => {
//                     if (isIOrFilter(item)) {
//                         if (item.$or.some(el => 'brand_id' in el)) {
//                             setBrandsParams(item);
//                         }
//                         if (item.$or.some(el => 'model_id' in el)) {
//                             setModelParams(item);
//                         }
//                     }
//                     if (isIAndFilter(item)) {
//                         const priceFilter = item.$and.find((el: any) => 'price' in el);
//                         if (priceFilter && !Array.isArray(priceFilter) && typeof priceFilter === 'object') {
//                             if ('price' in priceFilter && typeof priceFilter.price === 'object') {
//                                 setStartPrice(priceFilter.price['[$gte]'] ?? '');
//                                 setEndPrice(priceFilter.price['[$lte]'] ?? '');
//                             }
//                         }
//                     }
//                 });
//             }
//         }
//     }, []);
//     useEffect(() => {
//         const params: any = {
//             $and: [],
//         };
//
//
//         if (startPrice || endPrice) {
//             params.$and.push({});
//             params.$and[0]['price'] = {};
//             if (startPrice) params.$and[0]['price']['$gte'] = startPrice;
//             if (endPrice) params.$and[0]['price']['$lte'] = endPrice;
//         }
//
//         setPriceParams(params);
//
//     }, [startPrice, endPrice]);
//     useEffect(() => {
//         if (brandsParams['$or'] || modelParams['$or'] || priceParams['$and']) {
//             const newParams = {
//                 filters: {
//                     $and: [
//                         brandsParams,
//                         modelParams,
//                         priceParams
//                     ]
//                 }
//             }
//             router.push('/catalog/smartphones?' + qs.stringify(newParams, {
//                 encodeValuesOnly: true, // prettify URL
//             }));
//         }
//     }, [brandsParams, modelParams, priceParams]);
//     const router = useRouter();
//     const brands = useAppSelector(state => state.filtersReducer.brandsData);
//     const models = useAppSelector(state => state.filtersReducer.modelsData);
//     const dispatch = useAppDispatch();
//     useEffect(() => {
//         dispatch(getBrands());
//         dispatch(getModels());
//     }, []);
//
//     function clearFilters() {
//         setBrandsParams({$or: []});
//         setModelParams({$or: []});
//         setStartPrice('');
//         setEndPrice('');
//     }
//
//     return (
//         <div className="catalog__filters">
//             <h1>Каталог</h1>
//
//             <span className="catalog__filters-title">
//                 <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="19.25" y="0.400024" width="1.4" height="19" rx="0.7" transform="rotate(90 19.25 0.400024)"
//                       fill="#2f324d"></rect>
//                 <rect x="16.25" y="4.80005" width="1.4" height="13" rx="0.7" transform="rotate(90 16.25 4.80005)"
//                       fill="#2f324d"></rect>
//                 <rect x="12.25" y="9.20001" width="1.4" height="5" rx="0.7" transform="rotate(90 12.25 9.20001)"
//                       fill="#2f324d"></rect>
//             </svg>
//                 Фильтры
//             </span>
//             <CatalogFilterBrandsSection filterLabel={'brand_id'} title={'Бренд'} items={brands} params={brandsParams}
//                                         setParams={setBrandsParams}/>
//             <CatalogFilterModelsSection brandsParams={brandsParams} modelParams={modelParams} title={'Модель'}
//                                         filterLabel={'model_id'}
//                                         items={models}
//                                         setBrandsParams={setBrandsParams}
//                                         setModelParams={setModelParams}/>
//             <span className="catalog__filters-filter-title">Цена</span>
//             <div className="catalog__filters-price">
//                 <div className="catalog__filters-price-input catalog__filters-price-input--start">
//                     <span className="catalog__filters-price-title">от</span>
//                     <input placeholder={'от 16 990 ₽'} type="text" value={startPrice} onChange={(e) => setStartPrice(e.target.value)}/>
//                 </div>
//                 <div className="catalog__filters-price-input catalog__filters-price-input--end">
//                     <span className="catalog__filters-price-title">до</span>
//                     <input placeholder={'до 209 990 ₽'} type="text" value={endPrice} onChange={(e) => setEndPrice(e.target.value)}/>
//                 </div>
//             </div>
//             {brandsParams.$or.length !== 0 || modelParams.$or.length !== 0 || priceParams.$and.length !== 0 ?
//                 <SecondButton fontSize={'16px'} padding={'16px 32px'} onClick={clearFilters}>Очистить
//                     фильтр</SecondButton> : ''
//             }
//
//         </div>
//
//
//     );
// };
//
//
//



