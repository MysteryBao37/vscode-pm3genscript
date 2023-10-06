import { compile } from "../src/compile/compiler";

const result = compile(`
#dynamic 0xA05000

#org @1
setvar 0x4050 0x1
setflag 0x208C
clearflag 0x2050
goto @2

#org @2
#raw word 0x10
`);

console.log(result.blocks[0].data, result);