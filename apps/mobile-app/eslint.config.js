import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  ...compat.extends('expo'),
  ...compat.extends('universe/native'),
  ...compat.extends('universe/web'),
  ...compat.extends('universe/node'),
  ...compat.extends('universe/shared'),
  ...compat.extends('universe/typescript'),
  ...compat.extends('universe/prettier'),
  ...compat.extends('universe/storybook'),
  ...compat.extends('universe/jest'),
  ...compat.extends('universe/eslint-config-universe'),
];
