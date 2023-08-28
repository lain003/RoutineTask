FactoryBot.define do
  factory :user do
    token { SecureRandom.uuid }
  end
end
