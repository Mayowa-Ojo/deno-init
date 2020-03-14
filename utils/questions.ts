interface Questions {
   [propName: string]: string
}

export const questionsMap = new Map;
questionsMap.set('1', 'I');
questionsMap.set('2', 'II');
questionsMap.set('3', 'III');
questionsMap.set('4', 'IV');
questionsMap.set('5', 'V');
questionsMap.set('6', 'VI');
questionsMap.set('7', 'VII');
questionsMap.set('8', 'VIII');
questionsMap.set('9', 'IX');
questionsMap.set('10', 'X');
questionsMap.set('11', 'XI');

export const questions: Questions = {
   I: "New project huh, what's your entry file? <Default: mod.ts>",
   II: "Interesting you chose deno, should I generate a Makefile [yes(y) || no(n)]",
   III: "Would you like to use import maps? [yes(y) || no(n)]",
   IV: "How do you feel about a tsconfig? [yes(y) || no(n)]",
   V: "How about a test folder in the root directory? [yes(y) || no(n)]",
   VI: "Mind if I add a .gitignore? [yes(y) || no(n)]",
   VII: "You need a .env file don't you? [yes(y) || no(n)]",
   VIII: "I presume you want a README.md [yes(y) || no(n)]",
   IX: "LICENCE? If yes, what type? [yes(y) [ISC, MIT] || no(n)]",
   X: "I suggest you use type definitions(types.d.ts) [yes(y) || no(n)]",
   XI: "Your project is structured. Happy building",
}

export function mapQuestionsToIndex(map: Map<string, string>, questions: Questions, currentIndex: number): string {
   // ! - using non-null assertion operator to assert the existence if the index
   return questions[map.get(currentIndex.toString())!];
}