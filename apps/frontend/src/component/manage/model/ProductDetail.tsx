type ProductDetail = {
    id: number,
    code: string,
    quantity: string,
    price: number,
    category: Category | number,
    product: Product | number,
    color: Color | number,
    size: Size | number,
}