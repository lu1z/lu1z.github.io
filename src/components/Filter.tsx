import { useSearchParams } from 'react-router-dom';

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

  return (
    <label htmlFor={v} className={`tag ${v}`}>
      {v}
      <button type="button" id={v} onClick={handleClick}>X</button>
    </label>
  );
}

export default Filter;
