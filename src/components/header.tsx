import React from 'react';
import { View } from 'react-native';
import ThemeToggle from './theme-toggle';
import { Text } from './ui/text';

const Header = () => {
  return (
    <View role='banner' className='flex w-full flex-row items-center justify-between p-4'>
      <Text className='text-4xl font-bold'>Money Laundrying</Text>
      <ThemeToggle />
    </View>
  );
};

export default Header;
