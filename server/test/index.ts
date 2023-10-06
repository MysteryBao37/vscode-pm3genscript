import { compile } from "../src/compile";

const result = compile(`
#include "header.pts"

#dynamic 0xA05000

#org @1
setvar 0x4050 0x1
setflag 0x208C
clearflag 0x2050
goto @2

#org @2
#reserve 0xA
#raw word 0x10
`);