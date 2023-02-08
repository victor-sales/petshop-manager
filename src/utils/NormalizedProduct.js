export default function NormalizedProduct (products) {
    
    const { _id, product_name, type, brand, price, amount } = products

    return {
        id: _id,
        product_name: product_name,
        type: type,
        brand: brand,
        price: price,
        amount: amount,
    }
}