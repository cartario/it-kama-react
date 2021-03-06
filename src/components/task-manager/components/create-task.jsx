import React from 'react';
import PropTypes from "prop-types";
import s from '../style/task-manager.module.css';
import {connect} from 'react-redux';
import {Operation} from '../reducer/task-manager-reducer.js';
import {Toggles} from '../name-space.js';
import withSubmit from '../hocs/withSubmit';

const CreateTask = (props) => {
	const {toggleHandler, submitHandler, changeHandler, isErr, text} = props;
	
	const closeTaskClickHandler = () => {
		toggleHandler(Toggles.CREATE);
	}

	const escHandler = (e) => {
		if (e.keyCode === 27) {			
			toggleHandler(Toggles.CREATE);
		}
		return null;
	}

	return (
		<section className={isErr ? `${s.new_task} ${s.shake}` : s.new_task } onKeyDown={escHandler}>
			<div className={s.new_task__container}>
				<form onSubmit={submitHandler} className={s.new_task__form}>
					<label className={s.new_task__label}
						htmlFor="new-task"						
					>
						Краткое описание
					</label>
					<input onChange={changeHandler} className={s.new_task__input}
						name = "new_task"
						id="new-task"              
						value = {text}
						autoFocus
					/>
					{isErr && <p className={s.new_task__err}> Заголовок не может быть пустым</p>}
					<button className={`${s.button} ${s.new_task__button}`} type="submit">
						Создать
					</button>
				</form>
				<button onClick={closeTaskClickHandler} className={s.new_task__button_close}></button>
			</div>
		</section>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addTask (text) {		
		dispatch(Operation.postTask(text));
  },  
})

CreateTask.propTypes = {  
	addTask: PropTypes.func.isRequired,
	changeHandler: PropTypes.func.isRequired,
	toggleHandler: PropTypes.func.isRequired,
	submitHandler: PropTypes.func.isRequired,
	isErr: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export {CreateTask};
export default connect(null, mapDispatchToProps)(withSubmit(CreateTask));
