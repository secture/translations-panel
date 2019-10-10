import React from "react";
import Task from "./task";

type taskProps = {
    id: number,
    title: string,
    description: string,
    done: boolean,
}

class Tasks extends React.Component<any> {
    render() {
        return this.props.tasks.map((task: taskProps) => <Task data={task} key={task.id}/>);
    }
}

export default Tasks
