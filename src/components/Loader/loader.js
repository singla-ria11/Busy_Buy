//

import { GridLoader } from "react-spinners";

export function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      {/* <GridLoader color="#1CB5E0"/> */}
      {/* <GridLoader color="#1c84e0" /> */}
      {/* <GridLoader color="#404ab5" /> */}
      <GridLoader color="rgba(45, 8, 126, 0.826)" />
    </div>
  );
}
