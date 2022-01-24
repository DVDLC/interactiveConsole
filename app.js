const {
    inquirerMenu,
    pause,
    readInput,
    deleteListTasks,
    confirmation,
    completeListTasks,
}= require('./helpers/menuOpts')
const {saveDB, readDB} = require('./helpers/saveReadFile')
const Tasks = require('./models/tasks')

require('colors')




const main = async() => {

    const tasks = new Tasks()
    const homeworkDB = readDB()
    if(homeworkDB){
        tasks.loadHW(homeworkDB)
    }
    do {
        opt = await inquirerMenu()
        switch(opt){
            case '1':
                const desc = await readInput('Descripción:')
                tasks.createHW(desc)
                break;
            case '2':
                tasks.printCompleteLists()
                break;
            case '3':
                tasks.listTasksCompleted(true)
                break;            
            case '4':
                tasks.listTasksCompleted(false)
                break;
            case '5':
                const ids = await completeListTasks(tasks.arrList)
                tasks.toggleCompleted(ids)
                break;
            case '6':
                const id = await deleteListTasks(tasks.arrList)

                if (id !== '0'){
                    const ok = await confirmation(`¿Estas seguro?`)
                    if (ok){
                        tasks.deleteTask(id)
                        console.log('\nTarea borrada correctamente'.green)
                    }
                }
                break;
        }
        saveDB(tasks._list)

        await pause()
    } while(opt !== '0')
}

main()