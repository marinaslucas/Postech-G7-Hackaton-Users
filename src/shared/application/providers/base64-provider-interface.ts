export interface Base64ProviderInterface {
  decode(token: string): { id: string; email: string };
}
