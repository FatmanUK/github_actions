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
    // status 200
    // url https://api.github.com/repos/FatmanUK/dreamtrack21/issues/497/labels
    // headers { uninteresting }
    // data [
    //  {
    //    id: 3354422062,
    //    node_id: 'MDU6TGFiZWwzMzU0NDIyMDYy',
    //    url: 'https://api.github.com/repos/FatmanUK/dreamtrack21/labels/task',
    //    name: 'task',
    //    color: '4B4074',
    //    default: false,
    //    description: 'Not a bug or feature but something that needs doing.'
    //  }
    // ]
    /*Object.keys(existing_labels).forEach(key => {
      console.log(key, existing_labels[key]);
    });*/
    console.log('data', blob['data']);
    /*
data [
  {
    id: 2859686524,
    node_id: 'MDU6TGFiZWwyODU5Njg2NTI0',
    url: 'https://api.github.com/repos/FatmanUK/dreamtrack21/labels/spike',
    name: 'spike',
    color: '561062',
    default: false,
    description: 'Investigation is required to answer this question.'
  }
]
    */
    var labels = new Array();
    blob['data'].forEach(val => {
      var l = val['name'];
      labels.push(l);
      console.log(`Label: ${l}`);
    });
/*
    var labelstr = JSON.stringify(labels);
    console.log(`Labels: ${labelstr}`);
    labels.push(label);
*/
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
