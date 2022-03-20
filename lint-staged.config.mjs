export default {
  // Fix staged .ts files via ESLint & Typecheck all .ts files via TypeScript
  "*.ts": (files) =>
    `eslint --fix ${files.join(" ")}` &&
    `"tsc -p tsconfig.json --pretty --noEmit"`,
  // Pretty staged files
  "*": (files) => `prettier --ignore-unknown --write ${files.join(" ")}`,
};
