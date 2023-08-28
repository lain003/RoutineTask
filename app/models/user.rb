class User < ApplicationRecord
  def self.create_with_set_token!
    create!(token: SecureRandom.uuid)
  end
end
