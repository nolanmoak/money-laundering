import { View } from 'react-native';
import Dial from '~/components/dial/dial';
import Header from '~/components/header';
import CurrentStatus from '../components/current-status';
import useDialSize from '../hooks/use-dial-size';

export default function Index() {
  const size = useDialSize(240, 180, 400);
  return (
    <View className='flex-1 items-center justify-center gap-8'>
      <Header />
      <View className='flex-1'>
        <Dial radius={size} numberPadding={25} />
      </View>
      <View className='h-32'>
        <CurrentStatus />
      </View>
    </View>
  );
}
