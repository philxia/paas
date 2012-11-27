class CreateBlockCodes < ActiveRecord::Migration
  def change
    create_table :block_codes do |t|
      t.text :code
      t.string :name
      t.references :user

      t.timestamps
    end
    add_index :block_codes, :user_id
  end
end
