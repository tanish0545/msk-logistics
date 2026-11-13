import React from 'react';
import { ContainerServiceDoorCard, type ContainerServiceDoorCardProps } from '../services/ContainerServiceDoorCard';

export interface InteractiveContainerCardProps extends ContainerServiceDoorCardProps {}

/**
 * Reusable InteractiveContainerCard:
 * Photorealistic shipping container doors with authentic corrugated metal textures,
 * 3D perspective door opening on hover/focus, and MSK red interior ambient illumination.
 */
export const InteractiveContainerCard: React.FC<InteractiveContainerCardProps> = (props) => {
  return <ContainerServiceDoorCard {...props} />;
};
