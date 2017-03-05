class CreateTemperaturesTable < ActiveRecord::Migration
  def change
    create_table :temperatures do |t|
      t.timestamps
      t.float :temperature
    end
  end
end
