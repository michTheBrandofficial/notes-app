import Header from './Header';
import Notes from './Notes';
import Quicktools from './Quicktools';

const Body = () => {
  return (
    <section className="absolute z-10 top-0 w-full h-screen pl-4 py-4 text-gray-800 dark:text-gray-300 bg-white dark:bg-darkBlue tr-4 md:pl-2 md:w-[calc(100vw-300px)] md:right-0 lg:pl-12 ">
      <section
        className={'relative flex flex-col h-full w-full font-HantenGrotesk '}
      >
        <Header />
        <Notes />
        <Quicktools />
      </section>
    </section>
  );
};

export default Body;
