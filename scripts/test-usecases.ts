import { jestCommand } from './jestCommand';

const args = process.argv.slice(2);

const testDirectory = '__test__/application/usecases';
jestCommand(args, testDirectory);
