// Conventional Commits: <type>(<scope>): <subject>
// Examples:
//   feat(api): add OTP verification endpoint
//   fix(web): correct Sinhala text overflow on unit card
//   chore(repo): configure pnpm workspaces
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["repo", "web", "api", "shared", "db", "ci", "docs", "deps", "release", "design"],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "header-max-length": [2, "always", 100],
  },
};
