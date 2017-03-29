class CreateHeartRates < ActiveRecord::Migration
  def change
    create_table :heart_rates do |t|
      t.timestamps
      t.integer :heart_rate, null: false
    end
  end
end
