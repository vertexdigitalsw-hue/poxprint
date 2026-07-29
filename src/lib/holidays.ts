export interface Holiday {
  date: string; // "MM-DD"
  name: string;
  type: "national" | "municipal" | "facultative";
  year?: number;
}

function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getFixedHolidays(year: number): Holiday[] {
  return [
    { date: "01-01", name: "Ano Novo", type: "national" },
    { date: "21-04", name: "Tiradentes", type: "national" },
    { date: "01-05", name: "Dia do Trabalho", type: "national" },
    { date: "07-09", name: "Independência do Brasil", type: "national" },
    { date: "12-10", name: "Nossa Senhora Aparecida", type: "national" },
    { date: "02-11", name: "Finados", type: "national" },
    { date: "15-11", name: "Proclamação da República", type: "national" },
    { date: "20-11", name: "Consciência Negra", type: "national" },
    { date: "25-12", name: "Natal", type: "national" },
    { date: "24-06", name: "Dia de São João Batista (Padroeiro)", type: "municipal" },
    { date: "26-10", name: "Aniversário de Poxoréu", type: "municipal" },
  ];
}

function getVariableHolidays(year: number): Holiday[] {
  const easter = calculateEaster(year);
  const easterStr = `${String(easter.getMonth() + 1).padStart(2, "0")}-${String(easter.getDate()).padStart(2, "0")}`;
  const isEaster = (d: Date) => `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(easter.getDate() + 60);

  const carnival = new Date(easter);
  carnival.setDate(easter.getDate() - 47);

  return [
    { date: isEaster(carnival), name: "Carnaval", type: "facultative" },
    { date: isEaster(goodFriday), name: "Sexta-Feira Santa", type: "national" },
    { date: easterStr, name: "Páscoa", type: "facultative" },
    { date: isEaster(corpusChristi), name: "Corpus Christi", type: "facultative" },
  ];
}

export function isHoliday(date: Date = new Date()): Holiday | null {
  const year = date.getFullYear();
  const dateStr = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const allHolidays = [...getFixedHolidays(year), ...getVariableHolidays(year)];
  return allHolidays.find((h) => h.date === dateStr) || null;
}

const STORE_HOURS_WEEKDAY = { open: 730, lunchStart: 1100, lunchEnd: 1300, close: 1700 };
const STORE_HOURS_SATURDAY = { open: 730, close: 1100 };

export function getStoreStatus(): {
  isOpen: boolean;
  statusText: string;
  holiday: Holiday | null;
  nextOpen: string;
} {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const holiday = isHoliday(now);

  if (holiday && holiday.type !== "facultative") {
    return { isOpen: false, statusText: "Fechado", holiday, nextOpen: getNextOpenDay(now) };
  }

  if (day === 0) {
    return { isOpen: false, statusText: "Fechado", holiday: null, nextOpen: "Amanhã às 07:30" };
  }

  if (day === 6) {
    const isOpen = minutes >= STORE_HOURS_SATURDAY.open && minutes < STORE_HOURS_SATURDAY.close;
    return { isOpen, statusText: isOpen ? "Aberto" : "Fechado", holiday: null, nextOpen: isOpen ? "" : "Segunda às 07:30" };
  }

  const isOpen =
    (minutes >= STORE_HOURS_WEEKDAY.open && minutes < STORE_HOURS_WEEKDAY.lunchStart) ||
    (minutes >= STORE_HOURS_WEEKDAY.lunchEnd && minutes < STORE_HOURS_WEEKDAY.close);

  return { isOpen, statusText: isOpen ? "Aberto" : "Fechado", holiday: null, nextOpen: isOpen ? "" : getNextOpenDay(now) };
}

function getNextOpenDay(now: Date): string {
  const day = now.getDay();
  if (day <= 4) return "Amanhã às 07:30";
  if (day === 5) return "Amanhã às 07:30";
  if (day === 6) return "Segunda às 07:30";
  return "Amanhã às 07:30";
}
