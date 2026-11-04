import React from 'react';
import { ScrollReveal, type RevealDirection } from './ScrollReveal';

export interface StaggeredGridProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  baseDelay?: number;
  mode?: 'alternate' | 'columns-3' | 'columns-4' | 'up';
}

/**
 * StaggeredGrid: Renders a container of cards where each child receives
 * an alternating side-slide (or directional) scroll reveal entrance
 * with staggered timing.
 */
export const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  className = '',
  staggerMs = 80,
  baseDelay = 0,
  mode = 'alternate',
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        let direction: RevealDirection = 'up';
        if (mode === 'alternate') {
          direction = index % 2 === 0 ? 'left' : 'right';
        } else if (mode === 'columns-3') {
          direction = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right';
        } else if (mode === 'columns-4') {
          direction = index % 4 === 0 ? 'left' : index % 4 === 1 ? 'up' : index % 4 === 2 ? 'up' : 'right';
        }

        const delay = baseDelay + index * staggerMs;

        return (
          <ScrollReveal
            key={child.key ?? index}
            direction={direction}
            delay={delay}
            className="h-full"
          >
            {child}
          </ScrollReveal>
        );
      })}
    </div>
  );
};

