import React from "react";

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string;
  width?: string;
  padding?: string;
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  justifyContent = "center",
  alignItems = "center",
  wrap = "nowrap",
  gap = "0px",
  width = "100%",
  padding = "0px",
}) => {
  const flexStyle = {
    display: "flex",
    flexDirection: direction,
    justifyContent,
    alignItems,
    flexWrap: wrap,
    gap,
    width,
    padding,
  };
  return <div style={flexStyle}>{children}</div>;
};

export default Flex;
