const Filter = (props) => {
  return (
    <div>
      Find Countries:
      <input
        value={props.val}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default Filter;
