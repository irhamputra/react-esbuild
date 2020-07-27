import * as React from "react";

const css = {
  padding: 10,
  color: "black",
  border: "1px solid black",
  backgroundColor: "transparent",
  fontSize: 20,
};

const Button: React.FC<{
  title: string;
  type?: "button" | "submit" | "reset" | undefined;
  onPress?: () => void;
  style?: object;
}> = ({ title, onPress, style, type }) => {
  return (
    <button
      style={!style ? css : style}
      onClick={onPress && onPress}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
