const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input value={props.val} onChange={props.onChange} />
    </div>
  );
};

export default Filter;
