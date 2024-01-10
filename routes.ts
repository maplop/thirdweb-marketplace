export const routes = {
  home: "/",
  buy: "/buy",
  sell: "/sell",
  profile: (account: string) => `/profile/${account}`,
};
