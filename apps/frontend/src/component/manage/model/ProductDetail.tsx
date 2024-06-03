type ProductDetail = {
    id: number,
    code: string,
    quantity: string,
    price: string,
    category: Category | number,
    product: Product | number,
    color: Color | number,
    size: Size | number,
}