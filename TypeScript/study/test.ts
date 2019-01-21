//ts语法
class person{
    name:string;
    constructor(name:string){
        this.name=name
    }
    getname():string{
        return this.name;
    };
    setname(name:string):void{
        this.name=name;
    }
}
var p= new person('张三');
alert( p.getname());
p.setname('李四');
alert(p.getname())