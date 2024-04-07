import { FormEvent, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataContext from '../context/DataContext';

function Search() {
  const [, setSearchParams] = useSearchParams();
  const data = useContext(DataContext);

  const allTags = useMemo(
    () => Array.from(new Set(data.reduce<string[]>((acc, { tags }) => acc.concat(tags), []))),
    [data],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // typescript hates DOM =)
    const { target } = event;
    const form = target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Record<string, string>;
    // const formDataObj = Object.fromEntries(formData.entries());
    const params = new URLSearchParams(formData);
    setSearchParams(params);
  }

  return (
    <section className="flex row justify section">
      <form className="flex row justify form" onSubmit={handleSubmit}>
        <div className="flex row form-div">
          <h2>Title</h2>
          <input type="text" name="title" />
        </div>
        <div className="flex row">
          <h2>Tags</h2>
          <select className="select" name="tags">
            <option disabled selected value="">Selecione uma opção</option>
            {allTags.map((tag) => <option key={tag}>{tag}</option>)}
          </select>
        </div>
        <div className="flex row div-buttons">
          <button className="button" type="submit">Buscar</button>
          <button
            className="button"
            type="button"
            onClick={() => setSearchParams('')}
          >
            Limpar filtros
          </button>
        </div>
      </form>
    </section>

  );
}

export default Search;
