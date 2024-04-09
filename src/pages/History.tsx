import {
  useContext, useEffect, useMemo, useState,
} from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DataContext from '../context/DataContext';
import Post from '../types/PostType';
import Highlight from '../components/Highlight';

import './historyStyle.css';
import '../index.css';

type HighlightByMonth = {
  month: string;
  year: string;
  highlights: Post[];
};

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function History() {
  const data = useContext(DataContext);
  const [highlightsByMonth, setHighlightsByMonth] = useState<HighlightByMonth[]>([]);
  const allMonths = useMemo(
    () => Array.from(new Set(data.reduce<string[]>(
      (acc, { date: { month, year } }) => [...acc, `${month}-${year}`],
      [],
    ))),
    [data],
  );

  const allYears = useMemo(
    () => Array.from(new Set(allMonths.map((monthYear) => monthYear.split('-')[1]))),
    [allMonths],
  );

  useEffect(() => {
    setHighlightsByMonth(
      allMonths.map((monthYear) => {
        const [month, year] = monthYear.split('-');
        return {
          month: monthNames[Number(month) - 1],
          year,
          highlights: data
            .filter(({ date }) => date.month === Number(month) && date.year === Number(year)),
        };
      }),
    );
  }, [data, allMonths]);

  const [yearState, setYearState] = useState<number | ''>('');

  return (
    <>
      <Header />
      <div className="flex">
        <form className="flex row form-history">
          <h2>Escolha o período desejado</h2>
          <select
            value={yearState}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setYearState(Number(event.target.value));
            }}
            className="select"
            name="tags"
          >
            <option disabled selected value="">Selecione uma opção</option>
            {allYears
              .map((yearOption) => (
                <option key={yearOption}>{yearOption}</option>
              ))}
          </select>
          <button className="button" type="button" onClick={() => setYearState('')}>Limpar Filtro</button>
        </form>
      </div>
      <div className="history">
        {highlightsByMonth
          .filter(({ year }) => yearState === '' || Number(year) === yearState)
          .map(({ month, year, highlights }) => (
            <div key={`history-${month}-${year}`} className="history-month context-highlight">
              <h1 className="history-month-title">{`${month} ${year}`}</h1>
              <div className="main-highlight">
                {
                highlights.map((post) => <Highlight key={post.id} post={post} />)
              }
              </div>
            </div>
          ))}
      </div>
      {/* <h1>History</h1>
      {allMonths.map((m) => (
        <Link key={m} to={{ pathname: '/home', search: `date=${m}` }}>
          {m.replace('-', '/')}
          <br />
        </Link>
      ))} */}
    </>
  );
}

export default History;
