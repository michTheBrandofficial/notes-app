import { type NixixNode } from 'nixix';
import { VStack } from 'nixix/view-components';

type SettingsGroupProps = {
  name: string;
  children: NixixNode;
};

const SettingsGroup = (props: SettingsGroupProps): someView => {
  return (
    <VStack className={'w-full h-fit font-HantenGrotesk  space-y-4 '}>
      <h1 className={'text-peach text-[23px] '}>{props.name}</h1>
      <VStack className={'w-full h-fit text-[19px] space-y-5'}>
        {props.children}
      </VStack>
    </VStack>
  );
};

export default SettingsGroup;
