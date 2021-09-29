const palindrome = require('../utils/for_testing').palindrome;

test('palindrome of a', () => {
  // Execute the code to be tested (generate palindrome)
  const result = palindrome('a');

  // Verify results
  expect(result).toBe('a');
});

test('palindrome of react', () => {
  const result = palindrome('react');

  expect(result).toBe('tcaer');
});

test('palindrome of releveler', () => {
  const result = palindrome('releveler');

  expect(result).toBe('releveler');
});