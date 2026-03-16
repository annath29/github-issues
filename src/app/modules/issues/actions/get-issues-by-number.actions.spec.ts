import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from './get-issues-by-number.actions';

const mockIssue = {
  id: 1,
  number: 123,
  title: 'Test issue',
  body: 'Test Body',
};

const BASE_URL = `${environment.baseUrl}/issues`;
const GITHUB_TOKEN = environment.gitHUbToken;

describe('getIssueByNumber', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch; //backup valor originalk
  });
  afterEach(() => {
    window.fetch = originalFetch; //restablecer para otras pruebas
  });

  it('should fetch and return an issue successfully', async () => {
    // console.log(window.fetch)

    window.fetch = vi.fn().mockResolvedValue({
      //llamada simulada a la api mock del fetch
      ok: true,
      json: () => Promise.resolve(mockIssue),
    }); // siempre que se llame la api va a responder esto
    const result = await getIssueByNumber(mockIssueNumber);
    // console.log({result})
    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/${mockIssueNumber}`, {
      headers: {
        Authorization: `Bearer${GITHUB_TOKEN}`,
      },
    });
    expect(result).toEqual(mockIssue);
  });

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    // const response = await getIssueByNumber(mockIssueNumber)
    //  console.log({response})
    // expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(`Can't load issue ${mockIssueNumber}`)//warnirng por no poner el await porque es una promesa y proximas versiones puede que no soporten sinnel await
    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(
      `Can't load issue ${mockIssueNumber}`,
    );
  });

  it('should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(
      `Can't load issue ${mockIssueNumber}`,
    );
  });
});
