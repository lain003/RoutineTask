class CreateRoutineTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :routine_tasks do |t|
      t.string :name, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
