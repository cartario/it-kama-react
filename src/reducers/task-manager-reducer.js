import {extend} from "../utils.js";

const ActionType = {
  LOAD_TASKS: `LOAD_TASKS`,
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: `REMOVE_TASK`,
  
};

const adapter = (data) => {
  return {
    id: 4,
    title: `Загрузить данные с сервера`
  }
};

const initialState = {
	data:[
		{id:1, title: "Устроиться на работу",},
		{id:2, title: "Найти женщину своей мечты",},
		{id:3, title: "Сьездить в Швейцарию",},
	],
	length: 1,
	success: true,
	error: "",
};

export const Operation = {
  loadTasks: () => (dispatch, getState, api) => {
    return api.get()
    .then((response) => 
      dispatch(ActionCreator.loadTasks(adapter(response.data.data)))      
    )
    .catch((err)=>{
            
    });
  },
};

export const ActionCreator = {
  loadTasks: (tasks) => ({
    type: ActionType.LOAD_TASKS,
    payload: tasks,
  }),

  addTask: (id, text) => {

    return ({
      type: ActionType.ADD_TASK,
      payload: {
        id: id,
        text: text},
    })
  },

  removeTask: (id) => ({
    type: ActionType.REMOVE_TASK,
    payload: id,
  }),
};

export const reducer = (state = initialState, action) => {  
  switch (action.type) {    
    case ActionType.ADD_TASK:      
      const newTask = {id: action.payload.id, title: action.payload.text};

      return extend(state, {data: [...state.data, newTask]});
      
    case ActionType.REMOVE_TASK:      
      const tasks = state.data.filter((task) => task.id !== action.payload);
      return extend(state, {data: tasks});   

    case ActionType.LOAD_TASKS:      
      
      return extend(state, {data: [...state.data, action.payload]});   
      
    default :
      return state;  
  }
};
