import { atom, selector } from "recoil";

export const projectListState = atom({
  key: "project_list_state",
  default: {
    projects: [],
  },
});

export const projectListProjectsSelector = selector({
  key: "project_list_get_projects",
  get({ get }) {
    return get(projectListState).projects;
  },
});
