import React, { useEffect } from 'react';
import CityScene from '../game/CityScene';

export const CityPage: React.FC = () => {
  useEffect(() => {
    document.title = 'MORPHYX — 3D Open-World City';
  }, []);

  return <CityScene />;
};

export default CityPage;
