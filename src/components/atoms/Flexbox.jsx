import React from 'react';
import styled from 'styled-components';

export const StyledFlexbox = styled.div`
  display: flex;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : 'nowrap')};
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  align-items: ${({ align }) => (align ? align : 'center')};
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => (gap ? gap : '16px')};
  position: ${({ position }) => position};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};

  @media screen and (max-width: 1620px) {
    gap: ${({ gaLaptop }) => gaLaptop};
  }
  @media screen and (max-width: 768px) {
    gap: ${({ gapTablet }) => gapTablet};
  }
  @media screen and (max-width: 450px) {
    visibility: ${({ visibility }) => visibility};
    gap: ${({ gapPhone }) => gapPhone};
  }
`;

export const Flexbox = ({
  direction = 'row',
  gap,
  gaLaptop,
  gapTablet,
  gapPhone,
  align,
  children,
  width,
  justify,
  flexWrap,
  padding,
  margin,
  visibility,
  position,
}) => {
  return (
    <StyledFlexbox
      direction={direction}
      gap={gap}
      gaLaptop={gaLaptop}
      gapTablet={gapTablet}
      gapPhone={gapPhone}
      align={align}
      width={width}
      justify={justify}
      flexWrap={flexWrap}
      visibility={visibility}
      margin={margin}
      padding={padding}
      position={position}
    >
      {children}
    </StyledFlexbox>
  );
};
