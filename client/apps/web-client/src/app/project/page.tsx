import ProjectList from "@/features/project/project-list";
import { NextPage } from "next";

const ProjectPage: NextPage = () => {
  return (
    <main>
      <div>Projects</div>

      <ProjectList />
    </main>
  );
};

export default ProjectPage;
