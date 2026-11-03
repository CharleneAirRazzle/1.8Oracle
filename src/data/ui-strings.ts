export const UI = {
  appTitle: '1/8 Oracle',
  subtitle: 'One sign a day. One step forward.',
  drawButton: "Draw Today's Sign",
  drawing: 'Drawing…',
  resultBadge: "Today's Sign",
  resultCounter: 'Sign {n} of 8',
  backHome: 'Back to Home',
  alreadyDrawn: "You've already drawn today. Come back tomorrow.",
  comeBackTomorrow: 'Continue',
  loading: 'The Oracle is listening…',
  error: 'Something went wrong. Please try again.',
  footer: 'Trust the sign. Trust yourself.',
  betaBadge: 'Beta Preview',
} as const;

export function fmt(str: string, n: number): string {
  return str.replace('{n}', String(n));
}
