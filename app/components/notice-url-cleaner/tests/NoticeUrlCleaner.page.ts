export const createNoticeUrlCleanerPage = () => ({
  getCurrentUrl: (): string =>
    `${window.location.pathname}${window.location.search}`,
  getHistoryState: (): unknown => window.history.state,
});
