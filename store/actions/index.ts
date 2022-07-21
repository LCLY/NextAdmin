// control center for all actions
export { signIn, signInStart, signInFailed, signInSucceed, signOut } from './auth';
export {
  getProjects,
  getProjectsFailed,
  getProjectsStart,
  getProjectsSucceed,
  getSpecificProject,
  getSpecificProjectFailed,
  getSpecificProjectStart,
  getSpecificProjectSucceed,
  updateProject,
  updateProjectFailed,
  updateProjectStart,
  updateProjectClear,
  updateProjectSucceed,
} from './dashboard';
