# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker3.Repo.insert!(%Tasktracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktracker3.Repo
  alias Tasktracker3.Users.User
  alias Tasktracker3.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@g.com", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", email: "bob@g.com", password_hash: p })
    c = Repo.insert!(%User{ name: "carol", email: "carol@g.com", password_hash: p })
    d = Repo.insert!(%User{ name: "dave", email: "dave@g.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, task_name: "t1", task_description: "Hi, I'm Alice", time_taken: 15, completed: "pending" })
    Repo.insert!(%Task{ user_id: b.id, task_name: "t2", task_description: "Hi, I'm Bob", time_taken: 15, completed: "pending"})
    Repo.insert!(%Task{ user_id: b.id, task_name: "t3", task_description: "Hi, I'm bob again", time_taken: 15, completed: "pending" })
    Repo.insert!(%Task{ user_id: c.id, task_name: "t4", task_description: "Hi, I'm carol", time_taken: 15, completed: "pending" })
    Repo.insert!(%Task{ user_id: d.id, task_name: "t5", task_description: "Hi, I'm dave", time_taken: 15, completed: "pending" })
  end
end

Seeds.run
