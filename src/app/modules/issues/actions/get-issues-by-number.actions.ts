import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GitHubIssue } from '../interfaces';

const BASE_URL = `${environment.baseUrl}/issues`;
const GITHUB_TOKEN = environment.gitHUbToken;

export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssue> => {
  // await sleep(1500);
  try {
    const resp = await fetch(`${BASE_URL}/${issueNumber}`, {
      headers: {
        Authorization: `Bearer${GITHUB_TOKEN}`,
      },
    });
    if (!resp) throw `¡Can't load issue ${issueNumber}!`;

    const issue: GitHubIssue = await resp.json();
    console.log({ issue });
    
    return issue;
  } catch (error) {
    throw `Can't load issue ${issueNumber}`;
  }
};
