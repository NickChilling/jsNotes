



const before = new Date();

setTimeout(()=>{
    const diff = (new Date()).getTime()-before.getTime();
    console.log('time past:', diff);
})

while((new Date()).getTime()-before.getTime() < 500){

}
