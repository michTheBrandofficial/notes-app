import Icon from '@utils/nixix-heroicon';
import { trash as trashIcon } from '@utils/nixix-heroicon/outline';

type DeletedProps = TNote;

const Deleted = ({ body, createdDate, title }: DeletedProps) => {
  return (
    <section className="w-full h-fit flex items-start space-x-5 ">
      <div>
        <Icon path={trashIcon} className={'stroke-yellow-200  fill-none'} />
      </div>

      <article className="flex-grow h-fit space-y-1 ">
        <div className="flex w-full h-fit text-darkBlue items-center justify-between">
          <h1 className={'text-[17px] font-medium line-clamp-1 '}>{title}</h1>
          <p className={'text-[#081b336b] text-xs '}>{createdDate}</p>
        </div>
        <p
          className={
            'text-[#081b336b] text-[14px] h-[21px] w-[90%] line-clamp-1 lg:text-base '
          }
        >
          {body}
        </p>
      </article>
    </section>
  );
};

export default Deleted;
