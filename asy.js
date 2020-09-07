async function test() {
  let c = await 1;
  console.log(c);
}
function noAwaitTest() {
  let c = test();
  console.log(c);
}
