import { Octokit } from 'octokit';
import { Dashboard } from '@/app/dashboard';
// import testRepos from './test-repos.json';

const octokit = new Octokit();

async function getData() {
  // return testRepos;

  return (
    await octokit.request('GET /orgs/{org}/repos', {
      org: 'hahahackers',
    })
  ).data;
}

export type Data = typeof getData;

export default async function Home() {
  const repos = await getData();

  return <Dashboard repos={repos} />;
}
