import { jestCommand } from './jestCommand';

const args = process.argv.slice(2);

const testDirectory = '__test__/infra/http/controllers';

jestCommand(args, testDirectory);
