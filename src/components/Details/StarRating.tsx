import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

interface StarRatingProps {
  currentValue: number;
  setCurrentValue: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  currentValue,
  setCurrentValue,
}) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const starsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
  };

  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={containerStyle}>
      <div style={starsStyle}>
        {stars.map((_, index) => (
          <IoMdStar
            key={index}
            size={30}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.grey
            }
            style={{
              marginRight: 10,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
