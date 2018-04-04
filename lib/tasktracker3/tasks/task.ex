defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker3.Tasks.Task


  schema "tasks" do
    field :completed, :string
    field :task_description, :string
    field :task_name, :string
    field :time_taken, :integer
    belongs_to :user, Tasktracker3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:task_name, :task_description, :time_taken, :completed, :user_id])
    |> validate_required([:task_name, :task_description, :time_taken, :completed, :user_id])
  end
end
