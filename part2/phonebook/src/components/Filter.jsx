const Filter = ({onFilterChange, filterStr}) => {
  
  return (
    <div>
      filter: <input value={filterStr} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
