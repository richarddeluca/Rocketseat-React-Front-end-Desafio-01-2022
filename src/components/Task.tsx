import { AirplaneInFlight, Check, Trash } from "phosphor-react";
import styles from './Task.module.scss'
interface TaskProps {
  key_: string,
  text: string,
  isCompleted: boolean,
  onDeleteTask: (taskKey: string) => void,
  onCompleteTask: (taskKey: string) => void
}

export function Task({ key_, text, isCompleted = false, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleRemoveTask() {
    onDeleteTask(key_)
  }

  function handleCompleteTask() {
    onCompleteTask(key_)
  }
  return (
    <article className={isCompleted ? `${styles.completed} ${styles.task}` : styles.task}>
      <div className={styles.ok}>
        <span onClick={handleCompleteTask}><Check size={9} /></span>
      </div>
      <div className={styles.text}>
        <p>{text}</p>
      </div>
      <div className={styles.delete}>
        <button onClick={handleRemoveTask} >
          <Trash size={24} />
        </button>
      </div>
    </article >
  )
}