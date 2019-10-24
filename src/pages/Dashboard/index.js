/**
 * yarn add date-fns-tz (para trabalhar com TimeZone)
 */
import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import api from '~/services/api';
import { Container, Time } from './styles';

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    // const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    async function loadSchedule() {
      setLoading(true);
      try {
        const response = await api.get('schedules', {
          params: { date: format(date, 'yyyy-MM-dd'), timeZone: null },
        });

        const data = response.data.map(item => {
          return {
            time: item.time,
            past: item.past,
            appointment: item.appointment,
          };
        });
        setSchedule(data);
        setLoading(false);
      } catch (err) {
        toast.error('Falha ao obter [schedules]');
        setLoading(false);
        setSchedule([]);
      }
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>
      <div>
        {loading && <Loader type="Oval" color="#fff" />}
        <ul>
          {!loading &&
            schedule.map(time => (
              <Time
                key={time.time}
                past={time.past}
                available={!time.appointment}
              >
                <strong>{time.time}</strong>
                <span>
                  {time.appointment ? time.appointment.user.name : 'Livre'}
                </span>
              </Time>
            ))}
        </ul>
      </div>
    </Container>
  );
}
