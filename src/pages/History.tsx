import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DataContext from '../context/DataContext';
import Post from '../types/PostType';
import Highlight from '../components/Highlight';
import Footer from '../components/Footer';

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

  const [yearState, setYearState] = useState<number | ''>('');

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

  return (
    <main className="main-home">
      <Header />
      <form className="history-form">
        <h2>Escolha o período desejado</h2>
        <select
          value={yearState}
          onChange={({ target: { value } }) => setYearState(Number(value))}
          className="history-form-select"
          name="tags"
        >
          <option value="">Selecione uma opção</option>
          {allYears.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
        <button className="history-clean-button" type="button" onClick={() => setYearState('')}>
          Limpar Filtro
        </button>
      </form>
      <section className="history">
        {highlightsByMonth
          .filter(({ year }) => yearState === '' || Number(year) === yearState)
          .map(({ month, year, highlights }) => (
            <article key={`history-${month}-${year}`} className="history-month context-highlight">
              <h1 className="history-month-title">{`${month} ${year}`}</h1>
              <ul className="main-highlight">
                {highlights.slice(0, 2).map((post) => (
                  <li className="li-highlight" key={post.id}>
                    <Highlight post={post} />
                  </li>
                ))}
              </ul>
              <span className="highlight-link">
                {
                  highlights.slice(0, 1).map((index) => (
                    <Link key={index.date.day} to={{ pathname: `/home?date=${index.date.month}-${index.date.year}` }} className="highlight-link__button">MOSTRAR MAIS</Link>
                  ))
                }
              </span>

            </article>
          ))}
      </section>
      <Footer />
    </main>
  );
}

export default History;
