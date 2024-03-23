import { NextPage } from "next";

export interface ProjectIdPageProps {
  params: {
    id: string;
  };
}

const ProjectIdPage: NextPage<ProjectIdPageProps> = ({ params }) => {
  console.log(params);

  return (
    <div>
      <h1>Edit project</h1>
    </div>
  );
};

export default ProjectIdPage;
