import React from "react";
import Helmet from "react-helmet";

type tiltleProps ={
  title: any;
}


const MetaData: React.FunctionComponent<tiltleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;