export enum CatalogFilterNames {
    PRICE_GTE = 'filters[$and][0][price][$gte]',
    PRICE_LTE = 'filters[$and][1][price][$lte]'
}
export interface CatalogSearchParams {
    [CatalogFilterNames.PRICE_GTE]?: string
    [CatalogFilterNames.PRICE_LTE]?: string
}
