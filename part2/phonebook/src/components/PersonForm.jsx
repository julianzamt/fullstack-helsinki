const PersonForm = ({ handleName, handleNumber, handleAdd }) => {
  return (
    <form>
      <div>
        name: <input onChange={handleName} />
      </div>
      <div>
        {" "}
        number: <input onChange={handleNumber} />
      </div>

      <div>
        <button type="submit" onClick={handleAdd}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
