const core = require('@actions/core');
const github = require('@actions/github');
import { Octokit, App } from "octokit";

try {
  const colId = core.getInput('PROJECT_COLUMN_ID');
  const token = core.getInput('GITHUB_PERSONAL_ACCESS_TOKEN');

  console.log(`ColId: [${colId}]`);
  console.log(`Token: [${token}]`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const issId = JSON.stringify(github.context.payload.issue.id)
  console.log(`The event payload.issue.id: ${issId}`)

  const octokit = new Octokit({ 'auth': token });
//  octokit.rest.projects.createCard({
//    'column_id': colId,
//    'note': null,
//    'content_id': issId,
//    'content_type': 'Issue',
//  });
} catch (error) {
  core.setFailed(error.message);
}
