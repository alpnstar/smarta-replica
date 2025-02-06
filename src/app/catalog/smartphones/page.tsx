import {Catalog} from "@/components/Catalog/Catalog";
import {CatalogSearchParams} from "@/types/catalog";

interface SmartphonesProps {
    searchParams: Promise<CatalogSearchParams>
}

export default async function Smartphones({ searchParams : getSearchParams}: SmartphonesProps) {
    const searchParams = await getSearchParams;
    const urlParams = new URLSearchParams(searchParams as { [key: string]: string }).toString();
    return (
        <Catalog  searchParams={urlParams}/>
    )
}