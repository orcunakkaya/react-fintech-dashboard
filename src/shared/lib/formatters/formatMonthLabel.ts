const TR_TO_EN_MONTH: Record<string, string> = {
  Ocak: "Jan",
  Şubat: "Feb",
  Subat: "Feb",
  Mart: "Mar",
  Nisan: "Apr",
  Mayıs: "May",
  Mayis: "May",
  Haziran: "Jun",
  Temmuz: "Jul",
  Ağustos: "Aug",
  Agustos: "Aug",
  Eylül: "Sep",
  Eylul: "Sep",
  Ekim: "Oct",
  Kasım: "Nov",
  Kasim: "Nov",
  Aralık: "Dec",
  Aralik: "Dec",
};

export function formatMonthLabel(input: string) {
  if (!input) return "";

  if (TR_TO_EN_MONTH[input]) return TR_TO_EN_MONTH[input];

  const d = new Date(input);
  if (!Number.isNaN(d.getTime())) {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
    const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(d);
    return `${month} ${day}`;
  }

  return input;
}