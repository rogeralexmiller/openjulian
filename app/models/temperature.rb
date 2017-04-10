class Temperature < ActiveRecord::Base
  validates :temperature, presence: true, numericality: true
end
