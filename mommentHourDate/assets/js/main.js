/*
    Proposta exemplo: segunda-feira, 7 de outubro de 2019 às 22:52.
*/

function hourDateBrazil() {
    const hourDate = new Date();
    const hourDateToIntring = hourDate.toString();

    // Definição e conversão do dia da semana.
    const weekDay = hourDate.getDay();
    const convertWeekDay = getConvertWeekDay(weekDay);
    
    // Deninição do dia do mês.
    const monthDay = hourDate.getDate();

    // Definição e conversão do mês.
    const yearMonth = hourDate.getMonth();
    const convertYearMonth = getConvertYearMonth(yearMonth);

    // Definição do ano.
    const fullYear = hourDate.getFullYear();

    // Definição das horas.
    const hours = hourDate.getHours();

    // Definição dos minutos.
    const minutes = hourDate.getMinutes();

    // Mensagem a ser exibida
    const msg = `${convertWeekDay}, ${monthDay} de ${convertYearMonth} de ${fullYear} às ${addingZero(hours)}:${addingZero(minutes)}`;
    setDisplay(msg);
}

// Converte o dia da semana.
function getConvertWeekDay(weekDay) {
   const weekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

   if (weekDay == 0) return weekDays[0];
   if (weekDay == 1) return weekDays[1];
   if (weekDay == 2) return weekDays[2];
   if (weekDay == 3) return weekDays[3];
   if (weekDay == 4) return weekDays[4];
   if (weekDay == 5) return weekDays[5];
   if (weekDay == 6) return weekDays[6];
   else return 'xD';
}

// Converte o mês ano.
function getConvertYearMonth(yearMonth) {
    const yearMonths = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']; 
    if (yearMonth == 0) return yearMonths[0];
    if (yearMonth == 1) return yearMonths[1];
    if (yearMonth == 2) return yearMonths[2];
    if (yearMonth == 3) return yearMonths[3];
    if (yearMonth == 4) return yearMonths[4];
    if (yearMonth == 5) return yearMonths[5];
    if (yearMonth == 6) return yearMonths[6];
    else return ':P'
 }

 // Acrescendo um ZERO à esquerda.
 function addingZero (num) {
    return num >= 10 ? num : `0${num}`;
 }

 // Exibe a mensagem para o usuário
 function setDisplay(msg) {
    const container = document.querySelector('.container');
    return container.innerHTML = msg;
 }

hourDateBrazil();