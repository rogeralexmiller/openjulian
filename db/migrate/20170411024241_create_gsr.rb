class CreateGsr < ActiveRecord::Migration
  def change
    create_table :gsrs do |t|
      t.timestamps
      t.integer :gsr, null: false
    end
  end
end
