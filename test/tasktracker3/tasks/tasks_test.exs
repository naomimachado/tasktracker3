defmodule Tasktracker3.TasksTest do
  use Tasktracker3.DataCase

  alias Tasktracker3.Tasks

  describe "tasks" do
    alias Tasktracker3.Tasks.Task

    @valid_attrs %{completed: "some completed", task_description: "some task_description", task_name: "some task_name", time_taken: 42}
    @update_attrs %{completed: "some updated completed", task_description: "some updated task_description", task_name: "some updated task_name", time_taken: 43}
    @invalid_attrs %{completed: nil, task_description: nil, task_name: nil, time_taken: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tasks.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tasks.create_task(@valid_attrs)
      assert task.completed == "some completed"
      assert task.task_description == "some task_description"
      assert task.task_name == "some task_name"
      assert task.time_taken == 42
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, task} = Tasks.update_task(task, @update_attrs)
      assert %Task{} = task
      assert task.completed == "some updated completed"
      assert task.task_description == "some updated task_description"
      assert task.task_name == "some updated task_name"
      assert task.time_taken == 43
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
