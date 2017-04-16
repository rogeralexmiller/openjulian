class RenameGsrTable < ActiveRecord::Migration
  def change
    rename_table :gsrs, :skin_responses
  end
end
