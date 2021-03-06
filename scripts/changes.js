const getChangedWorkspaces = require("yarn-changed-workspaces");

(async () => {
  const workspaces = await getChangedWorkspaces({
    branch: "origin/main",
    projectRoot: process.cwd(),
  });
  // '{workspace-a,workspace-b}'
  console.log(`{${Object.keys(workspaces).join(',')}}`);
})();
