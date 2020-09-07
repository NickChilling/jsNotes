const REJECTED = "rejected";
const RESOLVED = "resolved";
const PENDING = "pending";

function myPromise(executor) {
  this.status = PENDING;
  this.value = undefined;
  this.err = undefined;
  this.onReject = [];
  this.onResolve = [];

  this.resolve = (data) => {
    if (this.status !== PENDING) {
      return;
    }
    this.value = data;
    this.onResolve.forEach((element) => {
      element(this.value);
    });
  };
  this.reject = (err) => {
    if (this.status !== PENDING) {
      return;
    }
    this.err = err;
    this.onReject.forEach((element) => {
      element(this.err);
    });
  };

  this.then = (onResolved, onRejected) => {
    if (this.status === REJECTED) {
      onRejected(this.err);
    }
    if (this.status === RESOLVED) {
      onResolved(this.value);
    }
    if (typeof onRejected === "function") {
      this.onReject.append(onRejected);
    }
    if (typeof onRejected === "function") {
      this.onResolve.append(onResolved);
    }
    return new myPromise(() => {});
  };
  try {
    executor(this.resolve, this.reject);
  } catch (e) {
    this.reject(e);
  }

  this.betterThen = (onResolve, onReject) => {
    if (typeof onResolve !== "function") {
      onResolve = (value) => value;
    }
    if (typeof onReject !== "function") {
      onReject = (err) => err;
    }

    const returnPromise = new myPromise((resolve, reject) => {
      if (this.status === RESOLVED) {
        resolve(onResolve(this.value));
      }
      if (this.status === REJECTED) {
        reject(onReject(this.err));
      }
      if (this.status === PENDING) {
        this.onResolved.push((value) => {
          resolve(onResolve(value));
        });
        this.onRejected.push((err) => {
          reject(onReject(err));
        });
      }
    });
    return returnPromise;
  };
  this.supportAsyncThen = (onResolve, onReject) => {
    if (typeof onResolve !== "function") {
      onResolve = (value) => value;
    }
    if (typeof onReject !== "function") {
      onReject = (err) => err;
    }
    const returnPromise = new myPromise((resolve, reject) => {
      if (this.status === RESOLVED) {
        const thenRes = onResolve(this.value);
        handlePromise(thenRes, resolve, reject);
      } else if (this.status === REJECTED) {
        const thenErr = onReject(this.err);
        handlePromise(thenErr, resolve, reject);
      } else {
        this.onResolve.push((value) => {
          const thenRes = onResolve(value);
          handlePromise(thenRes, resolve, reject);
        });
        this.onReject.push((err) => {
          const thenErr = onReject(err);
          handlePromise(thenErr, resolve, reject);
        });
      }
    });
  };
}
setTimeout(() => console.log(new Date().getTime()), 0);
setTimeout(() => console.log(new Date().getTime()), 0);
myPromise.prototype.handlePromise = (res, resolve, reject) => {
  if (res instanceof myPromise) {
    if (res.status === PENDING) {
      res.then((y) => {
        handlePromise(y, resolve, reject);
      });
    } else {
      res.then(resolve, reject);
    }
  }
  resolve(res);
};

const a = new myPromise(() => {});
// calculate month

//
