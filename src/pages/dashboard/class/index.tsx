import PageLayout from "components/common/pageLayout";
import ClassDetail from "components/containers/Classes";
import { ClassDetailProvider } from "context/classDetailContext";
import { useParams } from "react-router";

const ClassDetailPage = () => {
  // @ts-ignore
  const { classId } = useParams();

  return (
    <ClassDetailProvider id={classId}>
      <PageLayout>
        <ClassDetail />
      </PageLayout>
    </ClassDetailProvider>
  );
};

export default ClassDetailPage;
