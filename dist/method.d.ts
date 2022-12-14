import { MethodDeclaration, MethodSignature } from "typescript";
import { CGModuleNode } from "./module";
import { CGCodeNode } from "./node";
import { CGParameterNode } from "./param";
export declare class CGMethodNode extends CGCodeNode {
    readonly methodSignature: MethodSignature | MethodDeclaration;
    readonly genericTypes: string[];
    readonly module: CGModuleNode;
    parameters: CGParameterNode[];
    constructor(methodSignature: MethodSignature | MethodDeclaration, genericTypes: string[], module: CGModuleNode);
    private process;
    codeOfGeneric(): string;
    nameOfNode(): string;
    isOptionalReturnType(): boolean;
    codeOfReturnValue(): string;
    returnType(): import("typescript").TypeNode | undefined;
    returnConstructorType(): import("typescript").TypeNode | undefined;
    isClassType(): boolean;
    code(): string;
}
