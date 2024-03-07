import cx from 'clsx';
import { useMemo } from 'react';
import type { Data } from '@/app/page';
import languageColors from './language-colors.json';

const ignoreTopics = ['unfinished', 'level-1'];

const nameMap = new Map([
  ['css-tool', 'CSS Tools'],
  ['game', 'Games'],
  ['card-game', 'Card Games'],
  ['word-game', 'Word Games'],
  ['web-app', 'Web Applications'],
  ['color-app', 'Color Applications'],
  ['console-app', 'Console Applications'],
  ['tool', 'Development Tools'],
]);

const PROGRESS_GOAL = 5;

export function Dashboard({ repos }: { repos: Awaited<ReturnType<Data>> }) {
  const grouped = useMemo(() => {
    const grouped: Record<string, typeof repos> = {};

    for (const repo of repos) {
      for (const topic of repo.topics || []) {
        if (ignoreTopics.includes(topic)) {
          continue;
        }

        if (!grouped[topic]) {
          grouped[topic] = [];
        }

        grouped[topic].push(repo);
      }
    }

    return grouped;
  }, [repos]);
  return (
    <main className="m-12">
      <h1 className="text-6xl mb-6">Hahahackers Dashboard</h1>
      <ul className="inline-flex  gap-4">
        {Object.entries(grouped).map(([name, repos]) => (
          <li key={name}>
            <div className="ml-1 font-bold">
              <h2 className="text-xl">{nameMap.get(name) ?? name}</h2>
              <p
                className={cx('uppercase mb-2', {
                  'text-rose-500': repos.length < PROGRESS_GOAL,
                  'text-emerald-500': repos.length >= PROGRESS_GOAL,
                })}
              >
                Progress: {repos.length} of {PROGRESS_GOAL}
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a
                    className="relative inline-flex flex-col justify-between bg-slate-100 rounded p-4 w-72 h-48 transition hover:bg-slate-300"
                    href={repo.html_url}
                    target="_blank"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{repo.name}</h3>
                      <p className="">{repo.description}</p>
                    </div>
                    <p
                      className="text-slate-400 absolute right-4 bottom-4 text-sm"
                      style={{
                        color: (languageColors as Record<string, string>)[repo.language as string],
                      }}
                    >
                      {repo.language}
                    </p>
                    {repo.open_issues_count! > 0 && (
                      <p className="text-sm">
                        Issues:
                        <span className=""> {repo.open_issues_count}</span>
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
