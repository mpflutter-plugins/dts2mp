import { PropertySignature } from "typescript";
import { CGModuleNode } from "./module";
import { CGCodeNode } from "./node";
export declare class CGPropertyNode extends CGCodeNode {
    readonly propertySignature: PropertySignature;
    readonly genericTypes: string[];
    readonly module: CGModuleNode;
    constructor(propertySignature: PropertySignature, genericTypes: string[], module: CGModuleNode);
    isOptional(): boolean;
    isClassType(): boolean;
    nameOfNode(): string;
    nameOfProp(): string;
    codeDartType(): string;
    codeOfVars(): string;
    codeOfPlainSetter(): string;
    codeOfPlainSetterBlock(): string;
    codeOfToJSON(): string;
    codeOfDefaultValue(): string;
    code(): string;
}