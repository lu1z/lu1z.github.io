import { useSearchParams } from 'react-router-dom';
import '../css/filter.css';
import '../css/tag.css';

type FilterProps = {
  filterKey: string,
  filterValue: string,
};

function Filter({ filterKey: k, filterValue: v }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    searchParams.delete(k, v);
    setSearchParams(searchParams);
  }

  console.log(v);

  return (
    <label htmlFor={v} className={`filter tag ${v} `}>
      {v}
      <button type="button" className="filter-button" id={v} onClick={handleClick}>X</button>
    </label>
  );
}

export default Filter;
