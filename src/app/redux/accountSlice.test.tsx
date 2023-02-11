import { accountSlice } from './accountSlice';

const reducer = accountSlice.reducer;

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual([
    { profile: null, status: 'idle' }
  ])
})
