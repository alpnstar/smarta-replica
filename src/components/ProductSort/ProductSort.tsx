'use client';
import React, {FC, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from "qs";

enum SortOrder {
    asc = 'asc',
    desc = 'desc',
}

export const ProductSort: FC = () => {
    const [sortParams, setSortParams] = useState<SortOrder | null>(null);
    const router = useRouter();
    const params = useSearchParams();
    const path = usePathname();

    function setSortParamsHandler(val: SortOrder) {
        let newSortParams;
        if (sortParams === val) {
            newSortParams = null;

        } else {
            newSortParams = val;
        }
        foo(newSortParams);
        setSortParams(newSortParams);
    }

    function foo(sort) {
        const parsedSearchParams = qs.stringify(qs.parse(params.toString()), {encodeValuesOnly: true});
        const searchParamsCheck = parsedSearchParams ? '?' + parsedSearchParams : '';
        const sortParamsCheck = `${sort ? `${searchParamsCheck ? '&' : '?'}` + 'sort=price:' + sort : ''}`;
        router.push(path.toString() + searchParamsCheck + sortParamsCheck);


    }

    return (
        <div className="products__sort">
          <span className={`products__sort-item ${sortParams === SortOrder.asc ? '--active' : ''}`}
                onClick={() => setSortParamsHandler(SortOrder.asc)}>Сначала дешевле</span>
            <span className={`products__sort-item ${sortParams === SortOrder.desc ? '--active' : ''}`}
                  onClick={() => setSortParamsHandler(SortOrder.desc)}>Сначала дороже</span>
        </div>

    );
};