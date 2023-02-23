export default function NormalizedUser (user) {
    
    const { _id, date, cashier, buyer, product, amount, observations, sell_value } = user

    return {
        id: _id,
        date: date,
        cashier: cashier,
        buyer: buyer,
        product: product,
        amount: amount,
        sell_value: sell_value,
        observations: observations
    }
}