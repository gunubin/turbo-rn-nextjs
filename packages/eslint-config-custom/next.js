const rules = ['./rules/base', './rules/import', './rules/jsdoc'].map(require.resolve);

module.exports = {
  extends: ["next", "turbo", "prettier", ...rules],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
