const RESOLVED = 'resolved';
const REJECTED = 'rejected';
const PENDING = 'pending';

function myPromise(executor){
    this.status = PENDING;
    this.onRejected = [];
    this.onResolved = [];
    
    this.error = undefined;
    this.value = undefined;

    this.resolve = (value)=>{
        if(this.status === PENDING){
            this.status  = RESOLVED;
            this.value = value;
            this.onResolved.forEach(cb => cb(value))
        }
    };
    this.reject = (err)=>{
        this.status = REJECTED;
    };
    this.then = ()=>{};
    
    try{
        executor(this.resolve,this.reject)
    } catch(e){
        this.reject(e);
    }
}