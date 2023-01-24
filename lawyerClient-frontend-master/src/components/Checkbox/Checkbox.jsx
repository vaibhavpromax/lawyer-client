import "./Checkbox.module.scss";

const Checkbox = ({ name, checked, onChange, ...rest }) => {
  return (
    <label className={"checkbox"}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onClick={() => {
          onChange(!checked);
        }}
        {...rest}
      />
      <span className={"checkmark"}></span>
    </label>
  );
};

export default Checkbox;
