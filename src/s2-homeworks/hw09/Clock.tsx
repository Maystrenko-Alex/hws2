import React, { useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState, saveState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
        stop();
        const id = setInterval( ()=> { setDate(new Date())} , 1000)
        setTimerId(Number(id));
        saveState('hw9-id', id)
        
    }
    
    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        clearInterval(timerId);
        setTimerId(undefined);
        saveState('hw9-date', Date.now())
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
       setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }
    // const currentDate = new Date()
    const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    // const stringTime = 'date->time' || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringTime = date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )
    // const stringTime = date.toLocaleTimeString();

    // const stringDate = 'date->date' || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем
    const stringDate = date.getDate() + '.' + [+(date.getMonth())+1] + '.' + date.getFullYear();
    console.log(date.getMonth())
    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    // const stringDay = 'date->day' || <br/> // пишут студенты
    const stringDay = allDays[date.getDay()]
    // const stringMonth = 'date->month' || <br/> // пишут студенты
    const stringMonth = allMonth[date.getMonth()]
    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId === undefined ? false : true} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                    className={timerId === undefined ? s.btn : s.colorBtn}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined ? true : false} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                    className={timerId === undefined ? s.colorBtn : s.btn}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
