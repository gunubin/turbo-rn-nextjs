const ext = ['./rules/import'].map(require.resolve)

module.exports = {
  extends: ["next", "turbo", "prettier", ...ext],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
