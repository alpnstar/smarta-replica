import React, {FC} from "react";
import {Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {filtersActions} from "@/store/slices/filtersSlice";
interface ICatalogPaginationProps {
    pageCount:number,
}

export const CatalogPagination: FC<ICatalogPaginationProps> = ({pageCount}) => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(state => state.filtersReducer.pageParam);
    console.log(pageCount)
    return (
        <Pagination className="catalog__pagination" size={'large'} sx={{
            '.MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#e23d66',
                color: 'white',
                fontWeight: '700',
                '&:hover': {
                    backgroundColor: '#e23d66',
                    color: 'white',
                    fontWeight: '700',
                }

            }
        }} page={page} onChange={(e, page) => dispatch(filtersActions.setPageParam(page))} count={pageCount}/>

    );
};