// FROM HTML DOM
const monthName = document.getElementById("monthName");
const yearNumHeader = document.getElementById("yearNumHeader");
const datesContainer = document.getElementById("datesContainer");
const previousMonthBtn = document.getElementById("previousMonthBtn")
const nextMonthBtn = document.getElementById("nextMonthBtn")

// END
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const presentFullDate = new Date();
const presentMonthIndex = presentFullDate.getMonth();
const presentYearNum = presentFullDate.getFullYear();
const presentDate = presentFullDate.getDate();
let renderedMonthIndex = presentMonthIndex; // This'll track rendered state

renderMonth(presentYearNum, renderedMonthIndex, presentDate);

function renderMonth(yearNum, monthIndex, day)
{
   renderHeader(yearNum, monthIndex)
   renderSpacingBeforeFirstDate(yearNum, monthIndex)
   renderDates(yearNum, monthIndex)

}

function renderPreviousMonth()
{
   renderedMonthIndex--
   const prevMonthFullDate = new Date()
   prevMonthFullDate.setMonth(renderedMonthIndex);
   let prevMonthIndex = prevMonthFullDate.getMonth();
   let prevYearNum = prevMonthFullDate.getFullYear();

   datesContainer.innerHTML = ""

   renderHeader(presentYearNum, renderedMonthIndex)
   renderSpacingBeforeFirstDate(prevYearNum, prevMonthIndex)
   renderDates(prevYearNum, prevMonthIndex)

   console.log(prevMonthFullDate)
}

function renderNextMonth()
{
   renderedMonthIndex++
   const nextMonthFullDate = new Date()
   nextMonthFullDate.setMonth(renderedMonthIndex)
   let nextMonthIndex = nextMonthFullDate.getMonth();
   let nextYearNum = nextMonthFullDate.getFullYear(); 

   datesContainer.innerHTML = "";

   renderHeader(presentYearNum, renderedMonthIndex)
   renderSpacingBeforeFirstDate(nextYearNum, nextMonthIndex)
   renderDates(nextYearNum, nextMonthIndex) 
   console.log(nextMonthFullDate)
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
   monthIndex = monthIndex + 1;
   let totalDays = new Date(yearNum, monthIndex, date).getDate()
   console.log(totalDays)
   return totalDays
}

function renderHeader(yearNum, monthIndex) 
{
   let index = monthIndex;
   let wrappedIndex = (index % months.length + months.length) % months.length;
   let renderYearNum = new Date(yearNum, monthIndex, 1).getFullYear();
   monthName.textContent = months[wrappedIndex];
   yearNumHeader.textContent = renderYearNum;
   console.log(renderYearNum)
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

   function renderCell(date, cellClass=`dateCell`)
   {
      let cellSelected = false;

      let cell = document.createElement(`div`)
      cell.classList.add(cellClass);

      let dateNum = document.createElement(`span`)
      dateNum.textContent = date;

      cell.append(dateNum)
      datesContainer.append(cell)

      cell.onclick = function()
      {
         let currentSelected = datesContainer.querySelector(`.selectedCell`)
         if(currentSelected!==null)
         {
            currentSelected.setAttribute(`class`,`dateCell`);
         }
         
         if(cellSelected===true)
         {
            cellSelected = false
            cell.setAttribute(`class`,`selectedCell`)
            cell.setAttribute(`class`, `${cellClass}`)
         }
         else if (cellSelected===false)
         {
            cellSelected = true
            cell.setAttribute(`class`, `${cellClass}`)
            cell.setAttribute(`class`,`selectedCell`)
         }

      }

   }

   for(let i=1; i<=totalDays; i++)
   {
      if(i===presentDate)
      {
         renderCell(i, `presentDateCell`)
      }

      renderCell(i)
   }

}

datesContainer.addEventListener(`mousedown`, blockDubleClickSelection)
function blockDubleClickSelection(event)
{
   if(event.detail > 1)
   {
      event.preventDefault()
   }
}

/*
The whole calender needs to know what state its in currently. 
Pressing those next and prev buttons change the index to previous or the next 
index. */