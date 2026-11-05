import React from 'react';
import { Services3DContainerDropdown } from './Services3DContainerDropdown';

export interface Services3DHubDropdownProps {
  onClose: () => void;
}

/**
 * Re-exporting Services3DContainerDropdown for backward compatibility
 * and seamless integration with existing imports.
 */
export const Services3DHubDropdown: React.FC<Services3DHubDropdownProps> = (props) => {
  return <Services3DContainerDropdown {...props} />;
};

export { Services3DContainerDropdown };
