
import { Calendar, Islamic, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';
// 'Islamic' module injection
Calendar.Inject(Islamic);

//creates a calendar with islamic mode.
let calendarObject: Calendar = new Calendar({
    // To display the Islamic calendar
    calendarMode: 'Islamic',
    renderDayCell: customDates
});
calendarObject.appendTo('#element');

function customDates(args: RenderDayCellEventArgs): void {
  /*Date need to be disabled*/
  if ( args.date.getDate() === 12 || args.date.getDate() === 17 || args.date.getDate() === 28) {
    args.isDisabled = true;
  }
  /*Dates need to be customized*/
  if (args.date.getDate() === 13) {
    let span: HTMLElement;
    span = document.createElement('span');
    args.element.children[0].className += 'e-day sf-icon-cup highlight';
    addClass([args.element], ['special', 'e-day', 'dinner']);
    args.element.setAttribute('data-val', ' Dinner !');
    args.element.appendChild(span);
  }
  if (args.date.getDate() === 23) {
    let span: HTMLElement;
    span = document.createElement('span');
    args.element.children[0].className += 'e-day sf-icon-start highlight';
    span.setAttribute('class', 'sx !');
    //use the imported method to add the multiple classes to the given element
    addClass([args.element], ['special', 'e-day', 'holiday']);
    args.element.setAttribute('data-val', ' Holiday !');
    args.element.appendChild(span);
  }
}
