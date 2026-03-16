import { environment } from 'src/environments/environment.development';
import { getIssueComments } from './get-issue-comments.action';

const mockIssueComments = [
  {
    id: 1,
    number: 123,
    title: 'Test issue',
    body: 'Test Body',
  },
  {
    id: 2,
    number: 223,
    title: 'Test issue2',
    body: 'Test Body2',
  },
];

const BASE_URL = `${environment.baseUrl}/issues`;
const GITHUB_TOKEN = environment.gitHUbToken;

describe('getIssueComments', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch; //backup valor original
  });
  afterEach(() => {
    window.fetch = originalFetch; //restablecer para otras pruebas
  });

  it('should fetch and return an comments successfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssueComments),
    });
    const result = await getIssueComments(mockIssueNumber);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/${mockIssueNumber}/comments`, {
      headers: {
        Authorization: `Bearer${GITHUB_TOKEN}`,
      },
    });
    expect(result).toEqual(mockIssueComments);
  });
  it('should throw an error when response is not ok', async () => {
      window.fetch = vi.fn().mockRejectedValue({
        ok: false,
        status: 404,
        json: vi.fn(),
      });
        await expect(getIssueComments(mockIssueNumber)).rejects.toBe(
        `Can't load comments!`,
      );
    });
  
    it('should throw an error when fetch fails', async () => {
      window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
  
      await expect(getIssueComments(mockIssueNumber)).rejects.toBe(
        `Can't load comments!`,
      );
    });
});
