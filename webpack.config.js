module.exports = function (webpackEnv)=>{
    return {
        externals:{
            eruda:'eruada',// 指示哪些包不需要放在build时加入源代码，而是在运行时动态载入
        
        }   
    }
}