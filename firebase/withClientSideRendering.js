//another future reference for using hocs 
import { useEffect, useState } from "react";

const withClientSideRendering = (Component) => {
  return (props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return isClient ? <Component {...props} /> : null;
  };
};

export default withClientSideRendering;