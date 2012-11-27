class User < ActiveRecord::Base
  include Gravtastic
  gravtastic :secure => false, :filetype => 'jpg', :size => 48

  devise :database_authenticatable, :confirmable, :lockable, :recoverable,
    :rememberable, :registerable, :trackable, :timeoutable, :validatable,
    :token_authenticatable

  attr_accessible :email, :password, :password_confirmation

  has_many :block_codes
end
