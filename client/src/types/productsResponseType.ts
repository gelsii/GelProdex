export type dataProductsTypes = {
    _id: string,
    name: string,
    description: string,
    url_image: string
}

export type responseProducts  = { products: Array<dataProductsTypes> }