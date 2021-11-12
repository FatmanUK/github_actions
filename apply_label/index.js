const core = require('@actions/core');
const github = require('@actions/github');

try {
  const label = core.getInput('LABEL');
  const token = core.getInput('GITHUB_PERSONAL_ACCESS_TOKEN');
  console.log(`Label: [${label}]`);
  console.log(`Token: [${token}]`);
 
//  // Get the JSON webhook payload for the event that triggered the workflow
//  const issId = JSON.stringify(github.context.payload.issue.id)
//  console.log(`The event payload.issue.id: ${issId}`)

  github.rest.issues.addLabels({
    'issue_number': context.issue.number,
    'owner': context.repo.owner,
    'repo': context.repo.repo,
    'labels': ['needs-triage']
  });
} catch (error) {
  core.setFailed(error.message);
}
