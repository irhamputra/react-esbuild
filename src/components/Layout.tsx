import * as React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div style={{ fontFamily: "Helvetica", textAlign: "center" }}>
      {children}
    </div>
  );
};

export default Layout;
