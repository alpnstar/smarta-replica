import {Catalog} from "@/components/Catalog/Catalog";

interface IBrandParams {
    params: Promise<{
        brand: string
    }>
}

export default async function Page({params: getParams}: IBrandParams) {
    const params = await getParams;
    return (
        <div>
            <Catalog params={params}/>
        </div>
    );
}