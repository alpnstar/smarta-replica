'use client';
import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {filtersActions} from "@/store/slices/filtersSlice";

enum SortOrder {
    asc = 'price:asc',
    desc = 'price:desc',
}

export const ProductSort: FC = () => {
    const dispatch = useAppDispatch();
    const sortParam = useAppSelector(state => state.filtersReducer.sortParam);

    function setSortParamsHandler(val: SortOrder) {
        let newSortParams;
        if (sortParam === val) {
            newSortParams = null;

        } else {
            newSortParams = val;
        }
        dispatch(filtersActions.setSortParam(newSortParams));
    }


    return (
        <div className="products__sort">
          <span className={`products__sort-item ${sortParam === SortOrder.asc ? '--active' : ''}`}
                onClick={() => setSortParamsHandler(SortOrder.asc)}>Сначала дешевле</span>
            <span className={`products__sort-item ${sortParam === SortOrder.desc ? '--active' : ''}`}
                  onClick={() => setSortParamsHandler(SortOrder.desc)}>Сначала дороже</span>
        </div>

    );
};