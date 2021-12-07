const core = require('@actions/core');
const github = require('@actions/github');
import { Octokit, App } from "octokit";

try {
  const label = core.getInput('LABEL');
  const token = core.getInput('GITHUB_PERSONAL_ACCESS_TOKEN');
  const owner = github.context.repo.owner;
  const repo = github.context.repo.repo;
  const issue = github.context.issue.number;

  // get current labels and set labels array
  labels = octokit.rest.issues.listLabelsOnIssue({
    'owner': owner,
    'repo': repo,
    'issue_number': issue,
  });

  console.log(`Token: [${token}]`);
  console.log(`Owner: [${owner}]`);
  console.log(`Repo:  [${repo}]`);
  console.log(`Issue: [${issue}]`);
  labels.push(label);

  console.log(`Labels: [${labels}]`);
  const octokit = new Octokit({ 'auth': token });
  octokit.rest.issues.update({
    'owner': owner,
    'repo': repo,
    'issue_number': issue,
    'labels': labels
  });
} catch (error) {
  core.setFailed(error.message);
}
