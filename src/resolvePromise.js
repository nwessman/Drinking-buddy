export default
function resolvePromise(promiseToResolve, promiseState){
    promiseState.promise=promiseToResolve;
    promiseState.data= null;           // UI update! The user does not keep seeing results from previous search
    promiseState.error= null;
    //if(notifyACB){notifyACB();}
    if(!promiseToResolve){
        return;
    }
    
    function saveDataACB(result){ 
        if(promiseState.promise !== promiseToResolve) return;
        promiseState.data= result;
       // if(notifyACB){notifyACB();}
     }  // triggers UI update because of changing state
    function saveErrorACB(err)  { 
        if(promiseState.promise !== promiseToResolve) return; 
        promiseState.error= err;
        //if(notifyACB){notifyACB();}
    }    // triggers UI update because of changing state
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}
    