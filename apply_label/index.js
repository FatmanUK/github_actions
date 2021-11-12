const core = require('@actions/core');
const github = require('@actions/github');
import { Octokit, App } from "octokit";

try {
  const label = core.getInput('LABEL');
  const token = core.getInput('GITHUB_PERSONAL_ACCESS_TOKEN');
  const owner = github.context.repo.owner;
  const repo = github.context.repo.repo;
  const issue = github.context.issue.number;

  console.log(`Label: [${label}]`);
  console.log(`Token: [${token}]`);
  console.log(`Owner: [${owner}]`);
  console.log(`Repo:  [${repo}]`);
  console.log(`Issue: [${issue}]`);
 
  const octokit = new Octokit({ 'auth': token });

//  // Get the JSON webhook payload for the event that triggered the workflow
//  const issId = JSON.stringify(github.context.payload.issue.id)
//  console.log(`The event payload.issue.id: ${issId}`)

//  github.rest.issues.addLabels({
//    'issue_number': issue,
//    'owner': owner,
//    'repo': repo,
//    'labels': [ label ]
//  });

  octokit.rest.issues.update({
    'owner': owner,
    'repo': repo,
    'issue_number': issue,
    'labels': [ label ]
  });
} catch (error) {
  core.setFailed(error.message);
}
