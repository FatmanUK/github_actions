const core = require('@actions/core');
const github = require('@actions/github');

//curl -H "Accept: application/vnd.github.v3+json" -u FatmanUK:${GHTOKEN} https://api.github.com/repos/FatmanUK/dreamtrack21/issues/${TICKET_ID}
//# get id member
//curl -X POST -H "Accept: application/vnd.github.v3+json" -u FatmanUK:${GHTOKEN} -d '{"content_id": ${INT_CONTENT_ID}, "content_type": "Issue"}' https://api.github.com/projects/columns/${CONST_TRIAGE_ID}/cards

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
