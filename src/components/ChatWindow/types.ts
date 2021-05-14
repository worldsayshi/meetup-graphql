export interface Message {
  user: string;
  text: string;
}

export function isMessage(values: {user: string | null, text: string}): values is Message {
  return values.user !== null;
}