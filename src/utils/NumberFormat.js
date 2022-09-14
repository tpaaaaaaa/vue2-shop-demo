export const currencyForamt = function (number) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency', currency: 'CNY',
    }).format(number);
}