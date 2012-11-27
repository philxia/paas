class BlockCode < ActiveRecord::Base
  belongs_to :user
  attr_accessible :code, :name

  validate :code, :presence => true
  validate :name, :presence => true
end
