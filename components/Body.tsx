import Header from './Header';
import Notes from './Notes';
import Quicktools from './Quicktools';

const Body = () => {
  return (
    <section className="flex-1 relative z-[5] w-[75%] h-full flex flex-col py-4 pl-4 font-HantenGrotesk text-gray-800 dark:text-gray-300 bg-white dark:bg-darkBlue tr-4 lg:pl-12 ">
      <Header />
      <Notes />
      <Quicktools />
    </section>
  );
};

export default Body;
