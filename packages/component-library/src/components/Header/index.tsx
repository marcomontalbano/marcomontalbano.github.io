import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import Background from './Background';
import BrandName from './BrandName';
import IntersectionRoot from './IntersectionRoot';
import Menu from './Menu';

const rndGradient = () => Math.floor(Math.random() * 256);

const initialGradientStart = rndGradient();
const initialGradientEnd = rndGradient();

const Container = styled.header`
  position: relative;
  height: 70px;
`;

const FixedContainer = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: inherit;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, black -30%, transparent 90%);
  }
`;

const Header = ({
  forceSolid = true,
  gradientStart = initialGradientStart,
  gradientEnd = initialGradientEnd
}) => {
  const [solid, setSolid] = useState(forceSolid);
  const backgroundRef = useRef<any>();

  const intersectionObserverRef = useIntersectionObserver({
    threshold: 1,
    callback: ([entry]) => {
      console.log(entry.intersectionRatio);
      if (forceSolid === false) {
        setSolid(entry.intersectionRatio < 1);
      }
    }
  });

  const gradientProperties: any = {
    '--gradient-start': `hsl(${gradientStart}, 78%, 68%)`,
    '--gradient-end': `hsl(${gradientEnd}, 78%, 68%)`
  };

  return (
    <Container>
      <FixedContainer style={gradientProperties} >
        <Background ref={backgroundRef} isSolid={solid} className="animate" />
        <BrandName href="/">Website Title</BrandName>
        <Menu>
          <a>Home</a>
          <a>Portfolio</a>
        </Menu>
      </FixedContainer>
      <IntersectionRoot ref={intersectionObserverRef} />
    </Container>
  );
};

export default Header;
