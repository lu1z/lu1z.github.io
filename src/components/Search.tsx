import {
  ChangeEvent, FormEvent, useContext, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Filter from './Filter';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useContext(DataContext);

  const allTags = useMemo(
    () => Array.from(new Set(data.reduce<string[]>((acc, { tags }) => acc.concat(tags), []))),
    [data],
  );

  const allMonths = useMemo(
    () => Array.from(new Set(data.reduce<string[]>(
      (acc, { date: { month, year } }) => [...acc, `${month}-${year}`],
      [],
    ))),
    [data],
  );

  const availableTags = allTags.filter((t) => !searchParams.has('tags', t));
  const availableMonths = allMonths.filter((m) => !searchParams.has('date', m));

  function handleIntersectionInputSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // typescript hates DOM =)
    const { target } = event;
    const form = target as HTMLFormElement;
    const formData = new FormData(form);
    const [[name, formValue]] = formData.entries();
    const value = formValue as string;
    if (!value) return; // empty string not alowed TODO: SHOW ALERT
    if (searchParams.get(name)) searchParams.set(name, value);
    else searchParams.append(name, value);
    setSearchParams(searchParams);
  }

  function handleUnionParamChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target as HTMLSelectElement;
    searchParams.append(name, value);
    setSearchParams(searchParams);
  }

  function handleIntersectionParamChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target as HTMLSelectElement;
    if (searchParams.get(name)) searchParams.set(name, value);
    else searchParams.append(name, value);
    setSearchParams(searchParams);
  }

  return (
    <search className="flex column justify section">
      <section className="flex row justify form">
        <form className="flex row form-div" onSubmit={handleIntersectionInputSubmit}>
          <label htmlFor="name-filter">
            Pesquisar por aluno:
            <input id="name-filter" type="text" name="name" />
            <button type="submit">Q</button>
          </label>
        </form>
        <form className="flex row form-div" onSubmit={handleIntersectionInputSubmit}>
          <label htmlFor="title-filter">
            Pesquisar no título:
            <input id="title-filter" type="text" name="title" />
            <button type="submit">Q</button>
          </label>
        </form>
        <form className="flex row form-div" onSubmit={handleIntersectionInputSubmit}>
          <label htmlFor="description-filter">
            Pesquisar na descrição:
            <input id="description-filter" type="text" name="description" />
            <button type="submit">Q</button>
          </label>
        </form>
        <div className="flex row">
          <label htmlFor="tags-filter">
            Selecionar tags:
            <select id="tags-filter" className="select" name="tags" onChange={handleUnionParamChange}>
              {availableTags.map((tag) => <option key={tag}>{tag}</option>)}
            </select>
          </label>
        </div>
        <div className="flex row">
          <label htmlFor="date-filter">
            Selecionar periodo:
            <select id="date-filter" className="select" name="date" onChange={handleIntersectionParamChange}>
              {availableMonths.map((m) => <option value={m} key={m}>{m.replace('-', '/')}</option>)}
            </select>
          </label>
        </div>
        <div className="flex row div-buttons">
          <button
            className="button"
            type="button"
            onClick={() => {
              const params = new URLSearchParams();
              // const hasDateFilter = searchParams.get('date');
              // if (hasDateFilter) params.append('date', hasDateFilter);
              setSearchParams(params);
            }}
          >
            Limpar filtros
          </button>
        </div>
      </section>
      <div className="divisor" />
      <section className="flex row">
        <h2>Filtros aplicados:</h2>
        <ul className="flex row justify">
          {[...searchParams.entries()].map(
            ([k, v]) => <li key={v}><Filter filterKey={k} filterValue={v} /></li>,
          )}
        </ul>
      </section>
    </search>
  );
}

export default Search;
