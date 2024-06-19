import React, {useEffect, useState} from 'react';
import './LayoutStyles.css';
import Header from './header/Header';
import Content from './content/Content';

function Layout() {
  const [headerBackground, setHeaderBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 80) {
        setHeaderBackground("rgb(51, 51, 51, .7)");
      } else {
        setHeaderBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="layout">
      <Header backgroundHeader={headerBackground} />
      <div className="body">
        <Content/>
      </div>
    </div>
  );
}

export default Layout;