import {
  ChangeEvent, FormEvent, useContext, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Filter from './Filter';
import lupaImage from '../assests/lupa.png';
import '../css/search.css';

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
    <section className="search-component">
      <section className="search-section-form">
        <form className="search-form" onSubmit={handleIntersectionInputSubmit}>
          <fieldset>
            <legend>Pesquisar por aluno:</legend>
            <div className="search-input-container">
              <input id="name-filter" type="text" name="name" className="search-input" />
              <button type="submit" className="search-button">
                <img src={lupaImage} alt="Lupa" className="search-button-image" />
              </button>
            </div>
          </fieldset>
        </form>
        <form className="search-form" onSubmit={handleIntersectionInputSubmit}>
          <fieldset>
            <legend> Pesquisar no título:</legend>
            <div className="search-input-container">
              <input id="title-filter" type="text" name="name" className="search-input" />
              <button type="submit" className="search-button">
                <img src={lupaImage} alt="Lupa" className="search-button-image" />
              </button>
            </div>
          </fieldset>
        </form>
        <form className="search-form" onSubmit={handleIntersectionInputSubmit}>
          <fieldset>
            <legend> Pesquisar na descrição:</legend>
            <div className="search-input-container">
              <input id="description-filter" type="text" name="name" className="search-input" />
              <button type="submit" className="search-button">
                <img src={lupaImage} alt="Lupa" className="search-button-image" />
              </button>
            </div>
          </fieldset>
        </form>
        <div className="search-select-container">
          <label htmlFor="tags-filter">
            Selecionar tags:
            <select id="tags-filter" className="search-select" name="tags" onChange={handleUnionParamChange}>
              <option value="">tags</option>
              {availableTags.map((tag) => <option key={tag}>{tag}</option>)}
            </select>
          </label>
        </div>
        <div className="search-select-container">
          <label htmlFor="date-filter">
            Selecionar periodo:
            <select id="date-filter" className="search-select" name="date" onChange={handleIntersectionParamChange}>
              <option value="">data</option>
              {availableMonths.map((m) => <option value={m} key={m}>{m.replace('-', '/')}</option>)}
            </select>
          </label>
        </div>
        <div className="search-clean-div">
          <button
            className="search-clean-button"
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
      <div className="search-divisor" />
      <section className="search-filter-container{">
        <h2>Filtros aplicados:</h2>
        <ul className="search-filter-list">
          {[...searchParams.entries()].map(
            ([key, value]) => (
              <li className="search-filter-list-item" key={value}>
                <Filter filterKey={key} filterValue={value} />
              </li>
            ),
          )}
        </ul>
      </section>
    </section>
  );
}

export default Search;
