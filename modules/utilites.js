// Форматирует текущую дату и время в виде "ДД.ММ.ГГ ЧЧ:ММ"
export function getNowDate() {
  const nowDate = new Date()
    .toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " ");
  return nowDate;
}
