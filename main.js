// FROM HTML DOM
const monthName = document.getElementById("monthName");
const yearNumHeader = document.getElementById("yearNumHeader");
const datesContainer = document.getElementById("datesContainer");
const previousMonthBtn = document.getElementById("previousMonthBtn")
const nextMonthBtn = document.getElementById("nextMonthBtn")
const dateDetailsPopover = document.getElementById("dateDetailsPopover")
const addEventBtn = document.getElementById("addEventBtn")
const detailsPanelDate = document.getElementById("detailsPanelDate")
const eventInput = document.getElementById("eventInput")
// END
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const presentFullDate = new Date();
const presentMonthIndex = presentFullDate.getMonth();
const presentYearNum = presentFullDate.getFullYear();
const presentDate = presentFullDate.getDate();
let renderedMonthIndex = presentMonthIndex; // This'll track rendered state
let eventDatesCollection = []; // This will contain all of the date objects with events

class EventDate
{
   constructor(date, label)
   {
      this.date = date,
      this.label = label
   }
}

renderMonth(presentYearNum, presentMonthIndex, presentDate);

previousMonthBtn.addEventListener("click", renderPreviousMonth)
nextMonthBtn.addEventListener("click", renderNextMonth)

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
}

function getTotalDaysOfMonth(yearNum, monthIndex, date=0)
{
   monthIndex = monthIndex + 1;
   let totalDays = new Date(yearNum, monthIndex, date).getDate()
   return totalDays
}

function calcWrappedMonthIndex(yearNum, monthIndex) 
{
   let index = monthIndex;
   let wrappedIndex = (index % months.length + months.length) % months.length;
   return wrappedIndex;
} 

function calcYearFullNum(yearNum, monthIndex)
{
   let renderedYearNum = new Date(yearNum, monthIndex, 1).getFullYear();
   return renderedYearNum;
}

function renderHeader(yearNum, monthIndex)
{
   let wrappedIndex = calcWrappedMonthIndex(yearNum, monthIndex);
   let renderedYearNum = calcYearFullNum(yearNum, monthIndex);
   monthName.textContent = months[wrappedIndex];
   yearNumHeader.textContent = renderedYearNum;
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
 
   for(let i=1; i<=totalDays; i++)
   {
      if(i===presentDate && presentMonthIndex===renderedMonthIndex)
      {
         renderCell(i, `presentDateCell`)
         continue // Didnt have this before, it was doing presentDate twice cuz of that
      }

      renderCell(i)
   }

   function renderCell(date, cellClass=`dateCell`)
   {
      let cellSelected = false;
      let cellDate = date;

      let cell = document.createElement(`div`)
      cell.classList.add(cellClass);

      let dateNum = document.createElement(`span`)
      dateNum.textContent = date;

      cell.append(dateNum)
      datesContainer.append(cell)

      cell.addEventListener(`click`, cellSelection)

      function cellSelection()
      {
         let currentSelected = datesContainer.querySelector(`.selectedCell`)
         let wrappedMonthIndex = calcWrappedMonthIndex(presentYearNum, renderedMonthIndex);
         let renderedMonth = months[wrappedMonthIndex]

         if(currentSelected!==null)
         {
            currentSelected.setAttribute(`class`,`dateCell`);
         }
         
         if(cellSelected===true)
         {
            cellSelected = false
            cell.setAttribute(`class`,`selectedCell`)
            cell.setAttribute(`class`, `${cellClass}`)
            dateDetailsPopover.style.display = "none";
         }
         else if (cellSelected===false)
         {
            cellSelected = true
            cell.setAttribute(`class`, `${cellClass}`)
            cell.setAttribute(`class`,`selectedCell`)
            dateDetailsPopover.style.display = "block";
            detailsPanelDate.textContent = `${date} ${renderedMonth}`;
         }
         

      }
      
      addEventBtn.addEventListener("click", createEvent)
      function createEvent() 
      {
         let eventLabel = eventInput.value;
         // let newEvent = new EventDate(cellDate, eventLabel);
         // console.log(newEvent)
      };

   }

}

// Just create all dates as objects with no label and then give them a label when making event, when event is made / some date objects's label
// is true then store that inside eventDates array

datesContainer.addEventListener(`mousedown`, blockDubleClickSelection)
function blockDubleClickSelection(event)
{
   if(event.detail > 1)
   {
      event.preventDefault()
   }
}



/*

addEventBtn.addEventListener(`click`, getEventData)
function renderEvent(label) 
{
   let eventContainer = document.createElement(`div`);
   eventContainer.setAttribute(`class`, `eventContainer`)

   let eventLabel = document.createElement(`span`)
   eventLabel.textContent = label;

   eventContainer.append(eventLabel)
   dateDetailsPopover.append(eventContainer)

}

function getEventData()
{
   let eventLabel = inputEvent.value;

   renderEvent(eventLabel)
}

*/

/*
The whole calender needs to know what state its in currently. 
Pressing those next and prev buttons change the index to previous or the next 
index. */

/*
Alright, atp I am not sure how everything is working and it feels like the whole architecture is a mess. So I will try to 
write a simplified flow thing about how I think a calander should work.

Data Part:

- Get the present's data (what year, what month, what day it is, how many days in the month, what day it starts at)
- Based on those data, loop and make objects for each of the dates
- When navigating to previous/next month determine what's the difference between the present month and the prev/next month 
   (based on how many times prev/next is clicked)
- Get THAT prev/next (to-be-rendered) month's data (same things as before). Lets call it "renderedMonth data" (because just gonna do month-view)


----------------
How the FUCK should i add events to SPECIFIC dates
- 



----------------
How the FUCK do i make shit presist now............
Thats an issue for Future Tamim

-------------------------------------------------------------

Render Part:
- Render present in month view based on the present's data 
- Render new state of the calendar based on renderedMonth data

---------------



*/