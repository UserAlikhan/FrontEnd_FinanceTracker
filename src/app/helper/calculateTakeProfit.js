export function calculateTakeProfit(buyPrice, percentage) {
    return buyPrice * (1 + (percentage / 100))
}