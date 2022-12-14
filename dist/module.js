"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGModuleNode = void 0;
const typescript_1 = require("typescript");
const enum_1 = require("./enum");
const function_1 = require("./function");
const interface_1 = require("./interface");
const node_1 = require("./node");
const type_alias_1 = require("./type_alias");
class CGModuleNode extends node_1.CGCodeNode {
    constructor(moduleDeclaration) {
        super();
        this.moduleDeclaration = moduleDeclaration;
        this.interfaceInstances = {};
        this.enumInstances = {};
        this.typeAliasInstances = {};
        this.codeNodes = [];
        this.process();
    }
    process() {
        const body = this.moduleDeclaration.body;
        if (body && (0, typescript_1.isModuleBlock)(body)) {
            body.forEachChild((childNode) => {
                if ((0, typescript_1.isInterfaceDeclaration)(childNode) ||
                    (0, typescript_1.isClassDeclaration)(childNode)) {
                    const instance = new interface_1.CGInterfaceNode(childNode, this);
                    if (this.interfaceInstances[instance.nameOfNode()]) {
                        this.interfaceInstances[instance.nameOfNode()].merge(instance);
                    }
                    else {
                        this.interfaceInstances[instance.nameOfNode()] = instance;
                        this.codeNodes.push(instance);
                    }
                }
                else if ((0, typescript_1.isTypeAliasDeclaration)(childNode)) {
                    if (enum_1.CGEnumNode.isEnum(childNode)) {
                        const instance = new enum_1.CGEnumNode(childNode);
                        this.enumInstances[instance.nameOfNode()] = instance;
                        this.codeNodes.push(instance);
                    }
                    else {
                        const instance = new type_alias_1.CGTypeAliasNode(childNode);
                        this.typeAliasInstances[instance.nameOfNode()] = instance;
                        this.codeNodes.push(instance);
                    }
                }
                else if ((0, typescript_1.isFunctionDeclaration)(childNode)) {
                    this.codeNodes.push(new function_1.CGFunctionNode(childNode, this));
                }
            });
        }
    }
    code() {
        return `
import 'dart:convert';
import 'package:mpcore/mpjs/mpjs.dart' as mpjs;

${this.codeNodes.map((it) => it.code()).join("\n\n")}
`;
    }
}
exports.CGModuleNode = CGModuleNode;
