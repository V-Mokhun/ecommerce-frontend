
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://9m3083ev.api.sanity.io/v2023-08-01/graphql/production/default",
  documents: "src/**/*.graphql",
  generates: {
    "src/shared/api/generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
