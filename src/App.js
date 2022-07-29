import Header from "src/layout/Header/Header";
import Footer from "src/layout/Footer/Footer";
import Layout from "src/layout/Layout/Layout";

import Pathfind from "src/components/Pathfind/Pathfind";

const App = () => {
  return (
    <Layout>
      <Header />
      <Pathfind />
      <Footer />
    </Layout>
  );
};

export default App;
