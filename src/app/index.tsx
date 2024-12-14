import { useWindowDimensions, View } from 'react-native';
import Dial from '~/components/dial/dial';
import Header from '~/components/header';

export default function Index() {
  const dimensions = useWindowDimensions();

  return (
    <View className='flex-1 items-center justify-center gap-8'>
      <Header />
      <View className='flex-1'>
        <Dial radius={Math.min((dimensions.width * 0.95) / 2, 250)} numberPadding={25} />
      </View>
    </View>
  );
}
