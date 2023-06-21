import { ITab } from "../services/Tab";
import { ITask } from "../services/Task"
import { ITabSlice } from "./tabSlice"
import { sliceAddManyTask } from "./tabSlice"

export const addManyTaskToSlice = ({dispatch, tabs, tasks} : {dispatch, tabs : ITab[], tasks : ITask[]}) => {
    const taskDict: { [tabId: string]: ITask[] } = {};

    // Setup dictionary
    tabs.forEach((tab) => {
        taskDict[tab._id] = []
    });

    // Fill dictionary
    tasks.forEach((task) => {
        if (taskDict[task.tab]) {
            taskDict[task.tab].push(task)
        }
    });

    Object.entries(taskDict).forEach(([tabId, value], index) => {
        dispatch(sliceAddManyTask({id: tabId, tasks: value}))
    });
}
