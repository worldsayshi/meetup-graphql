import React from "react";


export default ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: "100%",
    height: "800px",
  }}>
    <>
      {children}
    </>
  </div>
);