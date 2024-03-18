const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input
        value={props.val}
        onChange={({ target }) => props.onChange(target.value)}
      />
    </div>
  );
};

export default Filter;
