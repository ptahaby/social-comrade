import React, { FC } from 'react';
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RIghtSidebar';
import { Navigation } from '../../../widgets/Naviation';
type Props = {
  children: React.ReactNode;
};
const Layout: FC<Props> = ({ children }) => (
  <div className=" scroll-smooth">
    <Navigation />
    <div className="container mx-auto">
      <main>
        <div className="mx-auto grid w-10/12 grid-cols-[1fr_2fr_1fr] gap-6">
          {/* Left sidebar */}
          <LeftSidebar />
          {/* Main section */}
          <div className="main-section border rounded">{children}</div>
          {/* Right sidebar */}
          <RightSidebar />
        </div>
      </main>
    </div>
  </div>
);

export default Layout;
