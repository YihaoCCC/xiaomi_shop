const STORAGE_KEY='mall';
export default {
    setItem(key,value,moudle_name){
        //往moudle——name下面添加属性及值eg：setItem（‘abc’，{a：1}，‘user’）往user下面的abc属性付一个a=1的属性
        if(moudle_name){
            let val=this.getItem(moudle_name);
            val[key]=value;
            this.setItem(moudle_name,val);
        }
        else {
            let val =this.getStorage();
            val[key]=value;
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
        }

    },
    getItem(key, moudle_name){
        if(moudle_name){
            let val=this.getItem(moudle_name);
            if(val){
                return val[key]
            }
        }
       return  this.getStorage(key);
    },
    getStorage(){
      return   JSON.parse( window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },
    clear(key,moudel_name){
        let val=this.getStorage();
        if(moudel_name){
            delete val[moudel_name][key];
        }
        else{
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));

    }
}