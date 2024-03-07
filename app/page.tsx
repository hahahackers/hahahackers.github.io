import { Octokit } from 'octokit';
import { Dashboard } from '@/app/dashboard';

const octokit = new Octokit();

async function getData() {
  const response = await octokit.request('GET /orgs/{org}/repos', {
    org: 'hahahackers',
  });

  return response.data;
}

export type Data = typeof getData;

export default async function Home() {
  const repos = await getData();

  return <Dashboard repos={repos} />;
}
