import { jestCommand } from './jestCommand';

const args = process.argv.slice(2);

const testDirectory = '__test__/infra/database';

jestCommand(args, testDirectory);
