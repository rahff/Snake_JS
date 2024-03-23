export const fake_date_provider = {
    now: () => new Date(2024, 2, 22),
    of: (year, month, day) => {
        const date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        return date;
    },
    date_in_past: () => new Date(2024, 2, 21)
}