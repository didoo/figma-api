const npmConfig = {
  subPackageChangelogs: false,
  monorepoChangelog: false,
};
/**
 * @link https://intuit.github.io/auto/docs/configuration/autorc
 */
module.exports = {
  onlyPublishWithReleaseLabel: false,
  prereleaseBranches: [],
  baseBranch: 'main',
  author: 'KnapsackBot <53622700+KnapsackBot@users.noreply.github.com>',
  plugins: [
    [
      // https://intuit.github.io/auto/docs/generated/npm
      'npm',
      npmConfig,
    ],
    // https://intuit.github.io/auto/docs/generated/released
    'released',
  ],
};
