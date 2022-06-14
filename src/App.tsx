import { v4 as uuidv4 } from 'uuid'
import { ChangeEvent, FormEvent, InvalidEvent, MouseEventHandler, useEffect, useState } from 'react';

import { Airplane, PaperPlane, Trash } from "phosphor-react";
import styles from './App.module.scss'
import { Task } from './components/Task';

interface TaskData {
  key: string,
  text: string,
  isCompleted: boolean,
  tag?: 'yellow' | 'red' | 'blue' | 'green',
  dateCreated?: Date,
  prazo?: Date
}


export default function App() {

  const [listaDeTarefas, setListaDeTarefas] = useState<TaskData[]>([
    { key: uuidv4(), isCompleted: false, text: 'Pupila donde tierra me ansioso dando gustada pisan pies, por y borrachos las los desangradas, con mi viciosa pisotean bala. Que de hule la con.' },
    { key: uuidv4(), isCompleted: true, text: 'Kusxante por por cxiuj kaj surteron estus. Velojn tute mi faris tiam la dankecon laux rifon, elsendis kaj blovos alia pli, levigxis da estas sorton nagxi blekegoj, povis tiamaniere renkontis ke gruntojn bonan sciis horoj.' },
    { key: uuidv4(), isCompleted: false, text: 'Pupila donde tierra me ansioso dando gustada pisan pies, por y borrachos las los desangradas, con mi viciosa pisotean bala. Que de hule la con.' },
    { key: uuidv4(), isCompleted: true, text: 'Kusxante por por cxiuj kaj surteron estus. Velojn tute mi faris tiam la dankecon laux rifon, elsendis kaj blovos alia pli, levigxis da estas sorton nagxi blekegoj, povis tiamaniere renkontis ke gruntojn bonan sciis horoj.' },
    { key: uuidv4(), isCompleted: false, text: 'Pupila donde tierra me ansioso dando gustada pisan pies, por y borrachos las los desangradas, con mi viciosa pisotean bala. Que de hule la con.' },
    { key: uuidv4(), isCompleted: true, text: 'Kusxante por por cxiuj kaj surteron estus. Velojn tute mi faris tiam la dankecon laux rifon, elsendis kaj blovos alia pli, levigxis da estas sorton nagxi blekegoj, povis tiamaniere renkontis ke gruntojn bonan sciis horoj.' },
    { key: uuidv4(), isCompleted: false, text: 'Pupila donde tierra me ansioso dando gustada pisan pies, por y borrachos las los desangradas, con mi viciosa pisotean bala. Que de hule la con.' },
    { key: uuidv4(), isCompleted: true, text: 'Kusxante por por cxiuj kaj surteron estus. Velojn tute mi faris tiam la dankecon laux rifon, elsendis kaj blovos alia pli, levigxis da estas sorton nagxi blekegoj, povis tiamaniere renkontis ke gruntojn bonan sciis horoj.' }


  ])
  const [numDeTarefas, setNumDeTarefas] =
    useState({ concluidas: 0, existentes: 0 })

  const [todoText, setTodoText] = useState<string>('')

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()
    const novaTarefa = { key: uuidv4(), isCompleted: false, text: todoText }
    setListaDeTarefas([...listaDeTarefas, novaTarefa])
    setTodoText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTodoText(event.target.value)
  }

  function handleCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('preenchimento obrigatório')
  }

  function removeTask(taskKey: string) {
    const todoListAfterDelete = listaDeTarefas.filter(task => {
      if (task.key !== taskKey) {
        return task
      }
    })
    setListaDeTarefas(todoListAfterDelete)
    contarNumDeTarefas()
  }
  function concludeTask(taskKey: string) {
    const todoListAfterConclude = listaDeTarefas.filter(task => {
      if (task.key !== taskKey) {
        return task
      }
      else if (task.key === taskKey) {
        task.isCompleted = !task.isCompleted
        return task
      }
    })
    setListaDeTarefas(todoListAfterConclude)
    contarNumDeTarefas()
  }

  function contarNumDeTarefas() {
    let count = 0
    function iterarPorCompleted(task: TaskData) {
      if (task.isCompleted == true) {
        count++
      }
    }
    listaDeTarefas.forEach(task => iterarPorCompleted(task))
    setNumDeTarefas({ concluidas: count, existentes: listaDeTarefas.length })
  }
  contarNumDeTarefas

  useEffect(() => {
    contarNumDeTarefas();
  }, [listaDeTarefas]);

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Airplane size={32} className={styles.headerLogo} />
          <h2 className={styles.a}>ToDo</h2>
        </div>
      </header>
      <form onSubmit={handleCreateNewTodo}>
        <input
          name="text"
          placeholder="escreva a tarefa a ser feita"
          type="text"
          maxLength={288 * 2}
          onChange={handleNewCommentChange}
          onInvalid={handleCommentInvalid}
          required
          value={todoText}
        />
        <button>criar</button>
      </form>
      <section className={styles.tasksSection}>
        <header>
          <p>Tarefas criadas: <span className={styles.numTarefas}>{numDeTarefas.existentes}</span></p>
          <p>
            <span>{numDeTarefas.concluidas}</span>
            {' '}de <span className={styles.numTarefas}>{numDeTarefas.existentes}</span> Concluídas
          </p>
        </header>
        <main className={listaDeTarefas.length < 1 ? styles.noTask : styles.hasTask}>
          {listaDeTarefas.length < 1 ?
            <>
              <PaperPlane />
              <p>
                Não há tarefas cadastradas
              </p>
              <p>Crie tarefas e organize suas ações ao longo do dia</p>
            </>
            : (

              listaDeTarefas.map(task => {
                return <Task
                  text={task.text}
                  key_={task.key}
                  key={task.key}
                  isCompleted={task.isCompleted}
                  onDeleteTask={removeTask}
                  onCompleteTask={removeTask}
                />
              }),
              listaDeTarefas.map(task => {
                return < Task
                  text={task.text}
                  key_={task.key}
                  key={task.key}
                  isCompleted={task.isCompleted}
                  onDeleteTask={removeTask}
                  onCompleteTask={concludeTask}
                />
              })
            )
          }
        </main>
      </section>
    </div>
  )
}

