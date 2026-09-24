import React from 'react';
import { StaticHeroSection } from './StaticHeroSection';
import { HeroSlider } from './HeroSlider';
import { HeroSlide } from '../../types';

interface HeroSectionSwitcherProps {
  heroEnabled: boolean;
  slides: HeroSlide[];
}

export const HeroSectionSwitcher: React.FC<HeroSectionSwitcherProps> = ({ heroEnabled, slides }) => {
  if (heroEnabled && slides.length > 0) {
    return <HeroSlider slides={slides} />;
  }
  return <StaticHeroSection />;
};
