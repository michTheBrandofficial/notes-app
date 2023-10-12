import { ClassList } from '@utils/classes';
import {
  SetSignalDispatcher,
  SignalObject,
  callReaction,
  callRef,
} from 'nixix/primitives';
import { VStack } from 'view-components';
import Header from './Header';
import Notes from './Notes';
import Quicktools from './Quicktools';

type BodyProps<T = boolean> = {
  toggleMenu: [SignalObject<T>, SetSignalDispatcher<T>];
};

const Body = ({ toggleMenu }: BodyProps): someView => {
  const bodyRef = callRef<HTMLElement>();
  const [sidebar, setSidebar] = toggleMenu;
  callReaction(() => {
    if (sidebar.value) ClassList.add(bodyRef.current, 'body-overlay');
    else ClassList.remove(bodyRef.current, 'body-overlay');
  }, [sidebar]);

  return (
    <VStack
      bind:ref={bodyRef}
      className="relative z-10 top-0 w-full h-screen pl-4 py-4 text-gray-800 dark:text-gray-300 bg-white dark:bg-darkBlue md:pl-2 md:w-[calc(100vw-300px)] md:right-0 md:absolute lg:pl-12   "
    >
      <VStack
        className={'relative flex flex-col h-full w-full font-HantenGrotesk '}
      >
        <Header {...{ toggleMenu }} />
        <Notes {...{ setSidebar }} />
        <Quicktools />
      </VStack>
    </VStack>
  );
};

export default Body;
