// Library Imports
import React from "react";

// Relative Imports
import { Container, Iframe } from "./styles";

const Video = () => {
  return (
    <Container>
      <iframe
        style={{
          position: "relative",
          width: "100%",
          height: "512px",
        }}
        src={`https://www.youtube.com/embed/Kh0kivKQX6c`}
        frameBorder="0"
      />
    </Container>
  );
};

export default Video;
