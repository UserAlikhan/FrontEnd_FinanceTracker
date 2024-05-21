export function calculateStopLoss(buyPrice, percentage) {
    return buyPrice * (1 - (percentage / 100))
}