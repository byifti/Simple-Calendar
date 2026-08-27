// FROM HTML DOM
const monthName = document.getElementById("monthName");
const yearNumHeader = document.getElementById("yearNumHeader");
const datesContainer = document.getElementById("datesContainer");
const previousMonthBtn = document.getElementById("previousMonthBtn")
const nextMonthBtn = document.getElementById("nextMonthBtn")

// END
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let prevNextClicks = 0;

renderPresent();

function renderPresent()
{
   const presentFullDate = new Date();
   const presentMonthIndex = presentFullDate.getMonth();
   const presentYearNum = presentFullDate.getFullYear();
   const presentDate = presentFullDate.getDate();

   renderHeader(presentYearNum, presentMonthIndex)
   renderSpacingBeforeFirstDate(presentYearNum, presentMonthIndex)
   renderDates(presentYearNum, presentMonthIndex)

}

function renderPreviousMonth()
{
   prevNextClicks++
   const prevMonthFullDate = new Date()
   prevMonthFullDate.setMonth(prevMonthFullDate.getMonth() - prevNextClicks);
   let prevMonthIndex = prevMonthFullDate.getMonth();
   let prevYearNum = prevMonthFullDate.getFullYear();

   renderHeader(prevYearNum, prevMonthIndex)
/* renderSpacingBeforeFirstDate(prevYearNum, prevMonthIndex)
   renderDates(prevYearNum, prevMonthIndex) */

   console.log(prevNextClicks)
}
function renderNextMonth()
{
   prevNextClicks++
   const nextMonthFullDate = new Date()
   nextMonthFullDate.setMonth(nextMonthFullDate.getMonth() + prevNextClicks);
   let nextMonthIndex = nextMonthFullDate.getMonth();
   let nextYearNum = nextMonthFullDate.getFullYear();

   renderHeader(nextYearNum, nextMonthIndex)
   console.log(prevNextClicks)
}

/* function renderPreviousMonth()
{
   const presentFullDate = new Date()
   const prevMonth = presentFullDate.setMonth(presentFullDate.getMonth() - 1);
   console.log(prevMonth)
} */ // FIGURE OUT WHY DOES THIS NOT WORK???? IT GIVES WEIRD BIG NUMBER

previousMonthBtn.addEventListener("click", renderPreviousMonth)
nextMonthBtn.addEventListener("click", renderNextMonth)


function getTotalDaysOfMonth(yearNum, monthIndex, date=0)
{
   yearNum = monthIndex + 1;
   let totalDays = new Date(yearNum, monthIndex, date).getDate()
   return totalDays
}

function renderHeader(yearNum, monthIndex) 
{
   monthName.textContent = months[monthIndex];
   yearNumHeader.textContent = yearNum;
} 

function renderSpacingBeforeFirstDate(yearNum, monthIndex)
{

   let firstDayOfMonth = new Date(yearNum, monthIndex, 1).getDay();
   let spacesBeforeFirstDay = firstDayOfMonth;

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

function renderDates(yearNum, monthIndex)
{

   let totalDays = getTotalDaysOfMonth(yearNum, monthIndex);

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


function clearOldDates()
{

   let cells = datesContainer.querySelectorAll(`.dateCell`);
   cells.forEach(removeCells)
   function removeCells(cell)
   {
      datesContainer.remove(cell)
   }

}

function clearOldSpacing()
{
   let spacingCells = datesContainer.querySelectorAll(`spacingCell`)
   spacingCells.forEach(removeSpacing) // queryselectorall works
   
   function removeSpacing(spacingCell)
   {
      datesContainer.remove(spacingCell)
   }

}


/*
The whole calender needs to know what state its in currently. 
Pressing those buttons change the index to previous or the next 
index. */