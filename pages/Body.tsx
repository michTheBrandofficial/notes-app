import { Header, Notes, Quicktools } from '@/components/ui';
import { setSidebar, sidebar } from '@/src/store/display';
import { ClassList } from '@/src/utils/classes';
import { Component } from 'nixix/dom';
import {
  callRef,
  reaction
} from 'nixix/primitives';
import { VStack } from 'nixix/view-components';

class Body extends Component {
  constructor() {
    super()
    this.setupBodyOverlayReaction()
  }

  bodyRef = callRef<HTMLElement>()

  bodyOverLayClass = 'body-overlay' as const

  setupBodyOverlayReaction() {
    reaction(() => {
      if (sidebar.value) ClassList.add(this.bodyRef, this.bodyOverLayClass);
      else ClassList.remove(this.bodyRef, this.bodyOverLayClass);
    }, [sidebar]);
  }

  jsx(): someView {

    return (
      <VStack
        bind:ref={this.bodyRef}
        className="relative z-10 top-0 w-full h-screen pl-4 py-4 text-gray-800 dark:text-gray-300 bg-white dark:bg-stone-700 md:pl-2 md:w-[calc(100vw-300px)] md:right-0 md:absolute lg:pl-12   "
      >
        <VStack
          className={'relative flex flex-col h-full w-full font-HantenGrotesk '}
        >
          <Header sidebar={sidebar} setSidebar={setSidebar} />
          <Notes setSidebar={setSidebar} />
          <Quicktools />
        </VStack>
      </VStack>
    );
  }
}

export default Body;
