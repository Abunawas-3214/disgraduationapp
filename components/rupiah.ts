export function Rupiah(value: number | null) {
    if (!value) {
        return "Rp. 0"
    }
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value)
}