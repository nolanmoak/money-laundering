import logo from '@/assets/images/logo.jpeg';
import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import ThemeToggle from './theme-toggle';
import { Text } from './ui/text';

const Header = () => {
  return (
    <View role='banner' className='flex w-full flex-row items-center justify-between p-4'>
      <Image source={logo} contentFit='cover' contentPosition='center' className='h-28 w-28 rounded-xl' />
      <Text className='native:hidden hidden text-4xl font-bold sm:block'>Money Laundrying</Text>
      <ThemeToggle />
    </View>
  );
};

export default Header;
