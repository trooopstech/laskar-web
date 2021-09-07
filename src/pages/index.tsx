import Layout from "components/common/layout";
import withAnon from "components/common/withAnon";
import Landing from "components/containers/Landing";

const LandingPage = () => {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
};

export default withAnon(LandingPage);
