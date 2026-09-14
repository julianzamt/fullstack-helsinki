const CountriesForm = ({ onChange, search }) => {
  return (
    <div>
      Find countries <input value={search} onChange={onChange}></input>
    </div>
  );
};

export default CountriesForm;
