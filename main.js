// FROM HTML DOM
const monthName = document.getElementById("monthName");
const yearNum = document.getElementById("yearNum");
let datesContainer = document.getElementById("datesContainer");
// END
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const currentDate = new Date();

let currentMonthIndex = currentDate.getMonth();
let currentYearNum = currentDate.getFullYear();

renderSpacingBeforeFirstDate()
renderDates()

// function renderHeader() {.textContent stuff below}
monthName.textContent = months[currentMonthIndex];
yearNum.textContent = currentYearNum;

function renderDates()
{
   let totalDays = getTotalDaysOfMonth(currentYearNum, currentMonthIndex);

   function renderCell(date)
   {
      let cell = document.createElement(`div`)
      cell.classList.add(`dateCell`);

      let dateNum = document.createElement(`span`)
      dateNum.textContent = date;

      cell.append(dateNum)
      datesContainer.append(cell)
   }

   for(let i=1; i<=totalDays; i++)
   {
      renderCell(i)
   }

}

function renderSpacingBeforeFirstDate()
{

   let currentFirstDay = new Date(currentYearNum, currentMonthIndex, 1).getDay();
   let spacesBeforeFirstDay = currentFirstDay;

   function renderSpace()
   {

      let spacingCell = document.createElement(`div`);
      spacingCell.classList.add(`spacingCell`);
      datesContainer.append(spacingCell)

   }

   for(let i = 0; i<spacesBeforeFirstDay; i++)
   {
      renderSpace()
   }
}

function getTotalDaysOfMonth(currentYear, currentMonth, date=0)
{
   currentMonth = currentMonth + 1;
   let totalDays = new Date(currentYear, currentMonth, date).getDate()
   return totalDays
}
