import {Catalog} from "@/components/Catalog/Catalog";

interface IModelParams {
    params: Promise<{
        brand: string
        model: string
    }>
}

export default async function Page({params: getParams}: IModelParams) {
    const params = await getParams;
    return (
        <div>
            <Catalog params={params}/>
        </div>
    );
}