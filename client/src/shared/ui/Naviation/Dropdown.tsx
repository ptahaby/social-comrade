import React from 'react';
import classNames from 'classnames';

type Props = {
  isShow: boolean;
};

type Ref = HTMLUListElement;

const Dropdown = React.forwardRef<Ref, Props>(function Dropdown(
  { isShow },
  ref,
) {
  const classN = classNames(
    'absolute -bottom-12 bg-teal-500 transition-all duration-200',
    {
      'opacity-0': !isShow,
      'translate-y-2': !isShow,
      invisible: !isShow,
      'opacity-100': isShow,
      'translate-y-0': isShow,
      visible: isShow,
    },
  );
  return (
    <ul ref={ref} className={classN}>
      <li className=" ">profile</li>
      <li>Logout</li>
    </ul>
  );
});

export default Dropdown;
