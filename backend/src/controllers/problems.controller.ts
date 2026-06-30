import { Request, Response } from 'express';
import { readDB, writeDB } from '../config/db';

export const getProblems = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.problems);
};

export const runProblem = (req: Request, res: Response) => {
  const { id } = req.params;
  const { code } = req.body;
  const db = readDB();

  const problem = db.problems.find((p: any) => p.id === id);
  if (!problem) {
    return res.status(404).json({ error: 'Problem definition not found.' });
  }

  try {
    if (!code || code.includes('// Write your code here') || code.trim().length < 30) {
      return res.json({
        success: false,
        consoleLogs: 'Compilation Error: Starter code left unaltered. Please provide a logical solution.',
        testOutputs: []
      });
    }

    const results = problem.testCases.map((tc: any, index: number) => {
      let passed = false;
      let output = '';
      try {
        const evaluator = new Function(`
          ${code}
          try {
            if (typeof twoSum === 'function') {
              return JSON.stringify(twoSum(${tc.input}));
            }
            if (typeof longestPalindrome === 'function') {
              return JSON.stringify(longestPalindrome(${tc.input}));
            }
            if (typeof maxFlow === 'function') {
              return JSON.stringify(maxFlow(${tc.input}));
            }
          } catch(e) {
            return "Error: " + e.message;
          }
        `);
        const resValue = evaluator();
        output = String(resValue);
        const cleanExpected = tc.expectedOutput.replace(/\s/g, '');
        const cleanActual = output.replace(/\s/g, '');
        passed = cleanActual === cleanExpected;
      } catch (e: any) {
        output = e.message;
      }

      return {
        testCaseIndex: index,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: output,
        passed,
      };
    });

    const allPassed = results.every((r: any) => r.passed);

    if (allPassed && !problem.solved) {
      problem.solved = true;
      db.user.xp += 150;
      db.user.level = Math.floor(db.user.xp / 1000) + 1;
      writeDB(db);
    }

    res.json({
      success: allPassed,
      consoleLogs: allPassed
        ? `⚡ Compilation Successful!\n🌟 All ${results.length} test cases completed successfully!\n🎁 +150 XP rewarded!`
        : `❌ Tests failed. Please review your logic and edge cases.`,
      testOutputs: results,
      user: db.user,
    });
  } catch (error: any) {
    res.json({
      success: false,
      consoleLogs: `Runtime Error: ${error.message}`,
      testOutputs: [],
    });
  }
};
