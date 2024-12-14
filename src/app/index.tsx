import { View } from 'react-native';
import Dial from '~/components/dial/dial';
import { Text } from '~/components/ui/text';

export default function Index() {
  return (
    <View className='flex-1 items-center justify-center gap-8'>
      <Text className='text-4xl font-bold'>Money Laundrying</Text>
      <View className='grid flex-1 grid-cols-3'>
        <View></View>
        <View className='flex-shrink-0 flex-grow'>
          <Dial radius={200} numberPadding={25} />
        </View>
        <Text className='text-center text-2xl'>Time until next</Text>
      </View>
    </View>
  );
}
