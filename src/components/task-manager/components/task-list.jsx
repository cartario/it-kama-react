import React from 'react';
import PropTypes from "prop-types";
import s from '../style/task-manager.module.css';
import CreateTask from './create-task.jsx';
import Task from './task.jsx';
import FullTask from './full-task.jsx';
import DeleteTask from './delete-task.jsx';
import withActiveTask from '../hocs/withActiveTask.js';
import withToggle from '../hocs/withToggle.js';
import {Toggles} from '../name-space.js';

const TaskList = (props) => {
  const {tasks, activeTask, isErrorPost, isAdding, isDeleting, statusCard,
    setActiveTask, toggleHandler} = props;

  const isDisabled = (statusCard[Toggles.CREATE] || statusCard[Toggles.EDIT] || statusCard[Toggles.DELETE]);

  return (
    <section className={`${s.taskmanager} ${s.tasks}`}>
      <div className={`${s.tasks__header} ${s.header}`}>
        <h1 className={s.header__title}>Список задач</h1>
        <button 
          onClick={()=>{toggleHandler(Toggles.CREATE)}} 
          className= {`${s.header__button} ${s.button} ${s.button__add}`}
          disabled ={isDisabled}
        >Добавить</button>
      </div>
      <div className = {s.tasks__container}>
        {isErrorPost && <p className = {s.error}>Проверьте подключение интернета</p>}
        {isAdding && <p className={`${s.status} ${s.status_adding}`}>loading...</p>}
        {isDeleting && <p className={`${s.status} ${s.status_deleting}`}>deleting...</p>}
        {tasks.length ? ``: <p>Ура! Все задачи выполнены!!!!!!</p>}
        <ul className={s.tasks__list}>
          {tasks.map((task)=> <Task 
          key={task.id}          
          task={task}           
          setActiveTask = {setActiveTask}
          isDisabled = {isDisabled}          
          toggleHandler = {toggleHandler}            
          />)}
        </ul>
      </div>
      {statusCard[Toggles.CREATE] && <CreateTask toggleHandler = {toggleHandler}/>}
      {statusCard[Toggles.EDIT] && <FullTask activeTask = {activeTask} toggleHandler = {toggleHandler}/>}
      {statusCard[Toggles.DELETE] && <DeleteTask activeTask = {activeTask} toggleHandler = {toggleHandler}/>}
    </section>)
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired, 
	activeTask: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
  }),
  statusCard: PropTypes.shape({
    isShowingCreate: PropTypes.bool.isRequired,
    isShowingFull: PropTypes.bool.isRequired,
    isShowingDelete: PropTypes.bool.isRequired,
  }),
	setActiveTask: PropTypes.func.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  loadTasks: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,	
  isErrorPost: PropTypes.bool.isRequired,	
};

export default withActiveTask(withToggle(TaskList));
