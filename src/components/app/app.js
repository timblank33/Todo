import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'

export default class App extends Component {
  maxId = 1
  state = {
    todoData: [this.createTaskItem('coffe'), this.createTaskItem('coffes'), this.createTaskItem('coffesen')],
    statusFilter: 'All',
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  saveItem = (id, text) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData].map((item) => {
        if (item.id === id) {
          item.label = text
          item.editing = false
        }
        return item
      })
      return {
        todoData: newArr,
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTaskItem(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  createTaskItem(label) {
    return {
      label,
      editing: false,
      completed: false,
      checked: false,
      id: this.maxId++,
      date: new Date(),
    }
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
      }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }
  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, editing: !oldItem.editing }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }
  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const completed = todoData.filter((item) => {
        return !item.completed
      })
      return {
        todoData: completed,
      }
    })
  }

  filterChange = (status) => {
    this.setState({
      statusFilter: status,
    })
  }

  filterTask(arr, status) {
    if (status !== 'All') {
      const newArr = arr.filter((item) => {
        if (status === 'Active') {
          return !item.completed
        }
        return item.completed
      })
      return newArr
    }
    return arr
  }

  render() {
    const active = this.state.todoData.filter((item) => !item.completed && !item.editing)
    const { todoData, statusFilter } = this.state
    const renderTodo = this.filterTask(todoData, statusFilter)
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={renderTodo}
            onDeleted={this.deleteItem}
            onChange={this.onChange}
            saveItem={this.saveItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
          />
          <Footer
            filterChange={this.filterChange}
            clearCompleted={this.clearCompleted}
            active={active.length}
            statusFilter={statusFilter}
          />
        </section>
      </section>
    )
  }
}
