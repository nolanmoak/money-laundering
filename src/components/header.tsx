import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { logoImage } from '../constants/images';
import ThemeToggle from './theme-toggle';
import { Text } from './ui/text';

const Header = () => {
  return (
    <View role='banner' className='flex w-full flex-row items-center justify-between p-4'>
      <View className='h-28 w-28 overflow-hidden rounded-xl'>
        <Image
          source={logoImage}
          contentFit='cover'
          contentPosition='center'
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <Text className='native:hidden hidden text-4xl font-bold sm:block'>Money Laundrying</Text>
      <ThemeToggle />
    </View>
  );
};

export default Header;
