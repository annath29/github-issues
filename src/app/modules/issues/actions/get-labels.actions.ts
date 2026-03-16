import { sleep } from '@helpers/sleep';
import { GitHubLabel } from '../interfaces/github-label.interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = `${environment.baseUrl}/labels`;
const GITHUB_TOKEN = environment.gitHUbToken;

export const getLabels = async (): Promise<GitHubLabel[]> => {
  // console.log("get issue by number called")
  // await sleep(1500);
  try {
    const resp = await fetch(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer${GITHUB_TOKEN}`,
      },
    });
    if (!resp) throw "Can't load labels";

    const labels: GitHubLabel[] = await resp.json();
    // console.log({ labels });
    return labels;
  } catch (error) {
    throw "Can't load labels";
  }
};
