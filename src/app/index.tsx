import { View } from 'react-native';
import Dial from '../components/dial/dial';

export default function Index() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Dial radius={200} numberPadding={25} />
    </View>
  );
}
