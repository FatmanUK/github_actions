const core = require('@actions/core');
const github = require('@actions/github');
import { Octokit, App } from "octokit";

try {
  const label = core.getInput('LABEL');
  const token = core.getInput('GITHUB_PERSONAL_ACCESS_TOKEN');
  const owner = github.context.repo.owner;
  const repo = github.context.repo.repo;
  const issue = github.context.issue.number;

  console.log(`Token: [${token}]`);
  console.log(`Owner: [${owner}]`);
  console.log(`Repo:  [${repo}]`);
  console.log(`Issue: [${issue}]`);
  console.log(`Label: [${label}]`);

  const octokit = new Octokit({ 'auth': token });
  octokit.rest.issues.listLabelsOnIssue({
    'owner': owner,
    'repo': repo,
    'issue_number': issue,
  })
  .then(blob => {
    // this is useful to show object members
    /*Object.keys(existing_labels).forEach(key => {
      console.log(key, existing_labels[key]);
    });*/
    //console.log('data', blob['data']);
    var labels = new Array();
    blob['data'].forEach(val => {
      var l = val['name'];
      labels.push(l);
      //console.log(`Label: ${l}`);
    });
    labels.push(label);
    console.log(`Labels: ${labels}`);
/*
    octokit.rest.issues.update({
      'owner': owner,
      'repo': repo,
      'issue_number': issue,
      'labels': labels
    });
*/
  })
  .catch(error => {
    console.log("error", error);
  });
} catch (error) {
  core.setFailed(error.message);
}
