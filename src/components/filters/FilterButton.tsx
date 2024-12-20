// FilterButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from '../../styles/filterButtonStyles';

interface FilterButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
  disabled?: boolean; 
}
export const FilterButton = ({ label, active, onPress }: FilterButtonProps) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyles.button,
        active ? buttonStyles.activeButton : buttonStyles.inactiveButton
      ]}
    >
      <Text
        style={[
          buttonStyles.label,
          active ? buttonStyles.activeLabel : buttonStyles.inactiveLabel
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

