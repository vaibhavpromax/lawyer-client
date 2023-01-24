import "./Container.scss";

const Container = ({ children, className }) => {
  return <div className={`lc-container ${className ?? ""}`}>{children}</div>;
};

export default Container;
