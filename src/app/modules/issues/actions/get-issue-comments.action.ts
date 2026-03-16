import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GitHubIssue } from '../interfaces';

const BASE_URL = `${environment.baseUrl}/issues`;
const GITHUB_TOKEN = environment.gitHUbToken;

export const getIssueComments = async (issueNumber: string): Promise<GitHubIssue[]> => {
  // await sleep(1500);
  try {
    const resp = await fetch(`${BASE_URL}/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer${GITHUB_TOKEN}`,
      },
    });
    if (!resp) throw "Can't load comments";

    const comments: GitHubIssue[] = await resp.json();
    // console.log({ comments });
    
    return comments;
  } catch (error) {
    throw "Can't load comments!";
  }
};
