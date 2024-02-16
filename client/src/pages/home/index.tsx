import React from 'react';
import LeftSidebar from '../../widgets/LeftSidebar';
const Home = () => {
  return (
    <div>
      <header>Header</header>
      <div className="container mx-auto">
        <main>
          <div className="mx-auto grid w-10/12 grid-cols-3 gap-6">
            {/* Left sidebar */}
            <LeftSidebar />
            {/* Main section */}
            <div className="main-section">Hello</div>
            {/* Right sidebar */}
            <section></section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
