import {Catalog} from "@/components/Catalog/Catalog";
import {CatalogSearchParams} from "@/types/catalog";

interface SmartphonesProps {
    params: Promise<any>,
    searchParams: Promise<CatalogSearchParams>
}

export default async function Smartphones({params: getParams, searchParams : getSearchParams}: SmartphonesProps) {
    const params = await getParams;
    const searchParams = await getSearchParams;
    const urlParams = new URLSearchParams(searchParams as { [key: string]: string }).toString();
    return (
        <Catalog params={params} searchParams={urlParams}/>
    )
}