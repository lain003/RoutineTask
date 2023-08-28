require 'rails_helper'

RSpec.describe RoutineTasksController, type: :request do
  let!(:user) {create(:user)}
  let(:headers) { { Authorization: ("Token " + user.token) } }

  describe "GET /index" do
    let!(:other_user) {create(:user)}
    subject { get '/routine_tasks', headers: headers }
    let!(:routine_tasks) { create_list(:routine_task, 5, user: user) }
    let!(:dummy_routine_tasks) { create_list(:routine_task, 3, user: other_user) }

    example "自分のRoutineTaskの一覧が返ってくる" do
      is_expected.to eq 200
      res_json = JSON.parse(response.body)
      expect(res_json.count).to eq 5
    end
  end

  describe "POST /routine_tasks" do
    subject { post '/routine_tasks', params: params, headers: headers, as: :json }
    let(:params) { { name: "遠くを⾒る" } }

    example "作成されたRoutineTaskのデータが返ってくる" do
      is_expected.to eq 201
      res_json = JSON.parse(response.body)
      expect(res_json["name"]).to eq "遠くを⾒る"
    end
  end

  describe "PUT /routine_tasks/[:id]" do
    let!(:routine_task) { create(:routine_task, name: "hoge", user: user) }
    subject { put '/routine_tasks/' + routine_task.id.to_s, params: params, headers: headers, as: :json }
    let(:params) { { name: "遠くを⾒る" } }

    example "更新されたRoutineTaskのデータが返ってくる" do
      is_expected.to eq 200
      res_json = JSON.parse(response.body)
      expect(res_json["name"]).to eq "遠くを⾒る"
    end

    example "DB内のデータが更新されている" do
      task = RoutineTask.find(routine_task.id)
      expect { subject }.to change{ task.reload.name }.from("hoge").to("遠くを⾒る")
    end
  end

  describe "DELETE /routine_tasks/[:id]" do
    let!(:routine_task) { create(:routine_task, name: "hoge", user: user) }
    subject { delete '/routine_tasks/' + routine_task.id.to_s, headers: headers, as: :json }

    example "指定されたデータが削除されている" do
      expect { subject }.to change{ RoutineTask.count }.from(1).to(0)
    end
  end
end
