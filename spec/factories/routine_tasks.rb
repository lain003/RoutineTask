FactoryBot.define do
  factory :routine_task do
    name { Faker::Name.unique.name }
  end
end