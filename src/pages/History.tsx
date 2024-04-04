import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DataContext from '../context/DataContext';

function History() {
  const data = useContext(DataContext);

  const allMonths = useMemo(
    () => Array.from(new Set(data.reduce<string[]>(
      (acc, { date: { month, year } }) => [...acc, `${month}-${year}`],
      [],
    ))),
    [data],
  );

  return (
    <>
      <Header />
      <h1>History</h1>
      {allMonths.map((m) => (
        <Link key={m} to={{ pathname: '/home', search: `date=${m}` }}>
          {m.replace('-', '/')}
          <br />
        </Link>
      ))}
    </>
  );
}

export default History;
