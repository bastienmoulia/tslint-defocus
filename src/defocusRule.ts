import * as Lint from "tslint";
import * as ts from "typescript";

// tslint:disable-next-line:interface-name
interface Options {
    deexclude: boolean;
}

export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: Lint.IRuleMetadata = {
        /* tslint:disable:object-literal-sort-keys */
        ruleName: "defocus",
        description: "Bans the use of `fdescribe` and `fit` Jasmine functions.",
        rationale: "It is all too easy to mistakenly commit a focussed Jasmine test suite or spec.",
        options: {
            type: "array",
            items: [
                {
                    type: "string",
                    enum: ["deexclude"],
                },
            ],
            additionalItems: false,
        },
        optionExamples: [
            [true],
            [true, "deexclude"],
        ],
        optionsDescription: "A `deexclude` argument can be added to bans the use of `xdescribe` and `xit`",
        type: "functionality",
        typescriptOnly: false,
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        // return this.applyWithFunction(sourceFile, walk);
        return this.applyWithWalker(new DefocusWalker(sourceFile, this.ruleName, {
            deexclude: this.ruleArguments.indexOf("deexclude") !== -1,
        }));
    }
}

// tslint:disable-next-line:max-classes-per-file
class DefocusWalker extends Lint.AbstractWalker<Options> {
    public walk(sourceFile: ts.SourceFile): void {

        const cb = (node: ts.Node): void => {
            if (node.kind === ts.SyntaxKind.CallExpression) {
                const expression = (node as ts.CallExpression).expression;
                const functionName = expression.getText();
                bannedFunctions.forEach((banned) => {
                    if (banned === functionName) {
                        this.addFailureAtNode(expression, failureMessage(functionName));
                    }
                });
                if (this.options.deexclude) {
                    bannedExcludeFunctions.forEach((banned) => {
                        if (banned === functionName) {
                            this.addFailureAtNode(expression, failureMessage(functionName));
                        }
                    });
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    }
}

const bannedFunctions: ReadonlyArray<string> = ["fdescribe", "fit"];
const bannedExcludeFunctions: ReadonlyArray<string> = ["xdescribe", "xit"];

const failureMessage = (functionName: string) => {
    return `Calls to '${functionName}' are not allowed.`;
};
