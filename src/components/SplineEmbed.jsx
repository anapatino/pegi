import React from "react";
import { Container, Loading } from "@nextui-org/react";
import { useState } from "react";

const SplineEmbed = ({ onLoad }) => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    if (onLoad) {
      onLoad(); // Llamada a la función de carga externa si se proporciona
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!splineLoaded ? (
        <Container
          css={{
            display: "flex",
            flexDirection: "column",
            padding: "50%",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Loading
            loadingCss={{ $$loadingSize: "9rem" }}
            color="secondary"
          ></Loading>
        </Container>
      ) : (
        ""
      )}
      <iframe
        title="canva"
        src="https://my.spline.design/untitled-9ad594d795586aa7b465aee7d4aa931b/"
        width="100%"
        height="100%"
        frameBorder="0"
        onLoad={handleSplineLoad}
      ></iframe>
    </div>
  );
};

export default SplineEmbed;
