import { accountSlice, initialState, setUser } from './accountSlice';

jest.mock('../api/agent', () => jest.fn());
jest.mock('../router/Routes', () => jest.fn());

const reducer = accountSlice.reducer;

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    profile: null,
    status: 'idle',
  });
});

describe('accountSlice', () => {
  it('should handle the setUser action', () => {
    const newProfile = {
      email: 'test@example.com',
      name: 'Test User',
      accessToken: 'abc123',
      refreshToken: 'def456',
    };
    const nextState = accountSlice.reducer(initialState, setUser(newProfile));
    expect(nextState.profile).toEqual(newProfile);
  });

  it('should handle the signOut action', () => {
    const currentState = {
      ...initialState,
      profile: {
        ...initialState.profile,
        email: 'test@example.com',
        name: 'test name',
        accessToken: 'at',
        refreshToken: 'rt',
      },
    };
    const nextState = accountSlice.reducer(
      currentState,
      accountSlice.actions.signOut()
    );
    expect(nextState.profile).toEqual(null);
  });
});
