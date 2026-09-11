const CountriesForm = ({ onChange }) => {
  return (
    <div>
      Find countries <input onChange={onChange}></input>
    </div>
  );
};

export default CountriesForm;
