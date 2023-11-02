export function formatNumber(number) {
    let numberFormat = parseInt(number);
    if (numberFormat >= 1000 && numberFormat < 1000000) {
        return (numberFormat / 1000).toFixed(0) + 'k';
    } else {
        return numberFormat.toString();
    }
}
