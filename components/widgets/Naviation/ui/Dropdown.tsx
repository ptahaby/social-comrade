import React from 'react';
import classNames from 'classnames';
import { userLogout } from '../../../entities/user';
import router from 'next/router';
import { useUserStore } from '@/entities/user';

type Props = {
  isShow: boolean;
};

type Ref = HTMLUListElement;

const Dropdown = React.forwardRef<Ref, Props>(function Dropdown(
  { isShow },
  ref,
) {
  const { user } = useUserStore();
  const classN = classNames('absolute transition-all duration-200 ', {
    'opacity-0': !isShow,
    'translate-y-2': !isShow,
    invisible: !isShow,
    'opacity-100': isShow,
    'translate-y-0': isShow,
    visible: isShow,
  });
  return (
    <ul
      ref={ref}
      className={`top-12 border border-gray-950 bg-zinc-100 rounded-md *:border-b *:p-3 ${classN}`}
    >
      <li className="last:border-b-0">{user?.email}</li>
      <li
        className="last:border-b-0"
        onClick={() =>
          userLogout().finally(() => {
            router.push('/');
          })
        }
      >
        Logout
      </li>
    </ul>
  );
});

export default Dropdown;
