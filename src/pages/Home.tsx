import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Search from '../components/Search';
import DataContext from '../context/DataContext';
import Highlight from '../components/Highlight';
import Post from '../types/PostType';
import '../css/highlight.css';
import '../index.css';

function Home() {
  const [searchParams] = useSearchParams();
  const data = useContext(DataContext);

  const filteredPosts = useMemo(() => {
    const searchFields = [...searchParams.entries()];
    return searchFields.reduce<Post[]>(
      (acc, [key, val]) => acc.filter(({ [key]: fieldValue }) => {
        if (Array.isArray(fieldValue)) return fieldValue.includes(val); // tags
        if (typeof fieldValue === 'object') return `${fieldValue.month}-${fieldValue.year}` === val; // data
        if (typeof fieldValue === 'number') return fieldValue === Number(val); // id
        if (typeof fieldValue === 'string') return fieldValue.toLowerCase().includes(val.toLowerCase()); // strings
        return false;
      }),
      [...data],
    );
  }, [data, searchParams]);

  return (
    <main className="main-home">
      <Header />
      <Search />
      <section className="context-highlight history-month">
        <h1 className="h1-title">Destaques</h1>
        <ul className="main-highlight">
          {filteredPosts.map((post) => (
            <li className="li-highlight" key={post.id}>
              <Highlight post={post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
