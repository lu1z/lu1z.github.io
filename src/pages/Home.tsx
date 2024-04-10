import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Search from '../components/Search';
import DataContext from '../context/DataContext';
import Highlight from '../components/Highlight';
import Post from '../types/PostType';

function Home() {
  const [searchParams] = useSearchParams();
  const data = useContext(DataContext);

  const filtered = useMemo(
    () => {
      const searchFields = [...searchParams.entries()];
      return searchFields.reduce<Post[]>(
        (acc, [key, val]) => acc.filter(
          ({ [key]: v }) => {
            if (Array.isArray(v)) return v.includes(val);// tags
            if (typeof v === 'object') return `${v.month}-${v.year}` === val;// data
            if (typeof v === 'number') return v === Number(val);// id
            if (typeof v === 'string') return v.toLowerCase().includes(val.toLowerCase());// strings
            return false;
          },
        ),
        [...data],
      );
    },
    [data, searchParams],
  );
  return (
    <>
      <Header />
      <Search />
      <div className="context-highlight history-month">
        <h1>Destaques:</h1>
        <main>
          <ul className="main-highlight">{filtered.map((post) => <li key={post.id}><Highlight post={post} /></li>)}</ul>
        </main>
      </div>
    </>
  );
}

export default Home;
