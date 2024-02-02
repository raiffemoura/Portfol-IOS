import React from 'react';
import { Link } from 'react-router-dom';
const CalendarApp = () => {
    const days = ["Sunday", "Monday", "Tuesday", "WED", "Thursday", "Friday", "Saturday"]
    const day = new Date().getDay()
    return ( 
        <div>
            <div className='calendarAppHover'>
            <div className='calendarApp '>
                <Link  to='/calendar' >
                    <div className=''>
                        <div className='weekDay'>{days[day]}</div>
                        <div className='day'>{new Date().getDate()}</div>
                    </div>
                </Link>
            </div>            
            </div>
            <p className='apps-text'>Calendar</p>

        </div>
        
     );
}
 
export default CalendarApp;