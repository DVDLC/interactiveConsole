const Task = require('./task')

/* _list:
    {'uuid-1233232323-23232-2: { id: 12, desc: abcd, completeOn: 12/12/21}
    {'uuid-1233232323-23232-2: { id: 12, desc: abcd, completeOn: 12/11/21}
 */

class Tasks {
    _list = {};

    get arrList(){
        const list = []
        Object.keys(this._list).forEach( key =>{
            const hw = this._list[key]
            list.push(hw)
        })
        return list
    }

    constructor(){
        this._list = {}
    }

    loadHW(list){
        const newHwArray = Object.values(list)
        newHwArray.forEach( hw => {
            this._list[hw.id] = hw
        })
    }

    createHW(desc = ''){
        const homework = new Task(desc)
        this._list[homework.id] = homework
    }

    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id]
        }
    }

    printCompleteLists(){
        console.log()
        this.arrList.forEach((task, i) => {
            const idx = `${i + 1}`.green
            const { desc, completedOn } = task

            const condition = (completedOn)
                                    ? 'Completado'.green
                                    : 'Pendiente'.red
            console.log(`${idx} ${desc} :: ${condition}`)
        })
    }

    listTasksCompleted(complete = true){
        console.log()
        let contador = 0
        this.arrList.forEach((task, i) => {
            const { desc, completedOn } = task

            const condition = (completedOn)
                                        ? 'Completado'.green
                                        : 'Pendiente'.red
            if(complete){
                // showing tasks completed
                if(completedOn){
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${completedOn.green}`)
                    }
            }else{
                //// showing tasks pendientes
                if(!completedOn){
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${condition}`)
                }    
            }    
        })
    }

    toggleCompleted (ids = []){
        ids.forEach(id => {
            const tsk = this._list[id]
            if(!tsk.completedOn){
                tsk.completedOn = new Date().toISOString()
            } 
        })

        this.arrList.forEach( tsk => {
            if(!ids.includes(tsk.id)){
                this._list[tsk.id].completedOn = null
            }
        })

    }
}
   module.exports = Tasks