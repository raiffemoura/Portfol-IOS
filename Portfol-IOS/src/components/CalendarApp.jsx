import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
const CalendarApp = () => {
    const days = ["Sunday", "Monday", "Tuesday", "WED", "Thursday", "Friday", "Saturday"]
    const day = new Date().getDay()
    const {t} = useTranslation()
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
            <p className='apps-text'>{t("calendar")}</p>

        </div>
        
     );
}
 
export default CalendarApp;