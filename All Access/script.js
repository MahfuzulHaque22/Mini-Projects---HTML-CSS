const hijriMonths = [
    'Muharram',
    'Safar',
    'Rabi Al-Awwal',
    'Rabi Al-Thani',
    'Jumada Al-Awwal',
    'Jumada Al-Thani',
    'Rajab',
    'Shaaban',
    'Ramadan',
    'Shawwal',
    'Dhul-Qadah',
    'Dhul-Hijjah',
  ];
  
  const hijriDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  
  const today = new Date();
  let hijriDate = toHijri(today);
  let currentMonth = hijriDate.month;
  let currentYear = hijriDate.year;
  let isRamadan = false;
  
  const calendar = document.querySelector('.calendar');
  const monthElement = calendar.querySelector('.month');
  const yearElement = calendar.querySelector('.year');
  const daysElement = calendar.querySelector('.days');
  
  monthElement.textContent = hijriMonths[currentMonth];
  yearElement.textContent = currentYear;
  
  renderCalendar(currentMonth, currentYear);
  
  daysElement.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TD') {
      const day = parseInt(target.textContent, 10);
      const selectedDate = new Date(Date.UTC(currentYear, currentMonth, day));
      const hijriSelectedDate = toHijri(selectedDate);
      console.log(hijriSelectedDate);
    }
  });
  
  function renderCalendar(month, year) {
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const daysInMonth = daysInHijriMonth(month, year);
    const startingDay = firstDayOfMonth.getUTCDay();
    
    daysElement.innerHTML = '';
    
    for (let i = 0; i < startingDay; i++) {
      const td = document.createElement('td');
      td.textContent = '';
      daysElement.appendChild(td);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const td = document.createElement('td');
      td.textContent = i;
      if (i === hijriDate.day && month === hijriDate.month && year === hijriDate.year) {
        td.classList.add('today');
      }
      if (isRamadan && i >= 1 && i <= 30 && month === 8 && year === hijriDate.year) {
        td.classList.add('ramadan');
      }
      daysElement.appendChild(td);
    }
  }
  
  function daysInHijriMonth(month, year) {
    if (month === 11) {
      if (isHijriLeapYear(year)) {
        return 30;
      } else {
        return 29;
      }
    } else {
      if (month % 2 === 0) {
        return 30;
      } else {
        return 29;
      }
    }
  }
  
  function isHijriLeapYear(year) {
    return (((year * 11) + 14) % 30) < 11;
  }
  
  
  function toHijri(gregorianDate) {
  const day = gregorianDate.getUTCDate();
  const month = gregorianDate.getUTCMonth();
  const year = gregorianDate.getUTCFullYear();
  const adjustment = 0;
  const gregorianEpoch = 1721425.5;
  const hijriEpoch = 1948439.5;
  
  let gregorianDay = (Date.UTC(year, month, day) / 86400000) + gregorianEpoch;
  
  let hijriDay = Math.floor((gregorianDay - hijriEpoch) / 29.530588853);
  let remainingDays = Math.floor(gregorianDay - hijriEpoch - (hijriDay * 29.530588853));
  let hijriYear = 0;
  let i = 1;
  
  while (i <= 12 && remainingDays >= 0) {
  let days = daysInHijriMonth(i, hijriDay);
  remainingDays -= days;
  if (remainingDays < 0) {
  remainingDays += days;
  break;
  }
  i++;
  }
  
  hijriYear = hijriDay + 1;
  if (i > 12) {
  i = 1;
  hijriYear++;
  }
  
  const hijriMonth = i - 1;
  const hijriDate = {
  day: Math.ceil(remainingDays),
  month: hijriMonth,
  year: hijriYear + adjustment,
  };
  
  return hijriDate;
  }
  
  function daysInHijriMonth(month, year) {
  if (month === 11) {
  if (isHijriLeapYear(year)) {
  return 30;
  } else {
  return 29;
  }
  } else {
  if (month % 2 === 0) {
  return 30;
  } else {
  return 29;
  }
  }
  }
  
  function isHijriLeapYear(year) {
  return (((year * 11) + 14) % 30) < 11;
  }
  
  