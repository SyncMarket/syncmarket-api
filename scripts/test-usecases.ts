import { execSync } from 'child_process';

const args = process.argv.slice(2);

let testDirectory = '__test__/application/usecases';

const flagIndex = args.findIndex((arg) => arg.startsWith('--'));
if (flagIndex !== -1) {
    const flag = args[flagIndex].substring(2);
    testDirectory += `/${flag}`;
}

const jestCommand = `jest ${testDirectory} --passWithNoTests --runInBand`;

try {
    execSync(jestCommand, { stdio: 'inherit' });
} catch (error) {
    process.exit(1);
}
