import React from "react";

type taskProps = {
    id: number,
    title: string,
    description: string,
    done: boolean,
}

class Task extends React.Component<any> {
    render() {
        const task = this.props.data;
        return (<div className="red">
            {task.title} -
            {task.description} -
            {task.done} -
            {task.id}
            <input type="checkbox"/>
            <button>

            </button>
        </div>);

    }
}

export default Task;
